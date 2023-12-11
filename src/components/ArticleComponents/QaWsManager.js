/**
 * The WebSocket protocol for QA between FE and BE is as follows:
 * 
 * 1. FE opens a WebSocket connection to the BE.
 * 2. FE sends a question to the BE over the WebSocket as plaintext.
 * 3. BE sends a list of sources to the FE over the WebSocket as a JSON array of objects.
 * 4. BE sends the answer pieces to the FE over the WebSocket as valid JSON objects like '{"a":"This is a pi"}
 *    'a' stands for Answer or Append.
 * 5. Repeat 4
 * 6. BE can send errors in websocket messages like '{"error":"This is an error"}' and then close the connection by dropping.
 */


/**
 * Encapsulates a WebSocket connection for QA.
 * 
 * The callbacks are overwriting setters, do not bother with accumulation yourself.
 */
export class QaWsManager {
  /**
   * @property {string} answer - The answer accumulator.
   * @public
   */
  answer = "";

  /**
   * @typedef {Object} Callbacks
   * @property {function(Array<Object>)} setSources - Called when source list has been updated.
   * @property {function(string)} setAnswer - Called when the generated answer has been updated.
   * @property {function(string)?} onError - Called when there's an error with the WebSocket.
   */

  /**
   * @typedef {Object} ApiInfo
   * @property {bool} ssl - Whether to use SSL.
   * @property {string} apiHost - The API host.
   */

  /**
   * @typedef {Object} SourceObj
   * @property {'yt'|'sp'|'ap'| tv'} source_type - 'yt' or 'sp' or 'ap' or 'tv'.
   * @property {string} source_id - The source ID.
   */

  /**
   * @typedef {Object} MyWorks
   * @property {boolean} include_bookmarks - Whether to include bookmarks.
   */

  /**
   * @typedef {Object} QaWsManagerOptions
   * @property {ApiInfo} apiInfo - The API info.
   * @property {Callbacks} callbacks - The callback functions for WebSocket events.
   * @property {string} question - The question to ask.
   * @property {SourceObj} [source] - The source to run QA on.
   * @property {MyWorks} [myWorks] - The myWorks object.
   * @property {string} [arcId] - The arcId for qa scope.
   * @property {string} [lang] - The question lang.
   * @property {string} [idToken] - The idToken for authenticated usage, like MyWorks.
   */

  /**
   * Initializes a new instance of the QaWsManager class.
   * You must set exactly one of 'source', 'myWorks' or 'arcId'.
   * @param {QaWsManagerOptions} options - The QaWsManager options.
   */
  constructor(options) {
    /** @private */
    this._options = options;

    if ([options.source, options.myWorks, options.arcId].filter(Boolean).length !== 1) {
      throw new Error("Exactly one of source, myWorks, or arcId must be provided.");
    }

    /** @private */
    this._ws = new WebSocket(this.wsUrl);

    this._bindEvents();
  }

  /**
   * Gets the WebSocket URL.
   * @returns {string} The WebSocket URL.
   */
  get wsUrl() {
    const url = `ws${this._options.apiInfo.ssl ? 's' : ''}://${this._options.apiInfo.apiHost}/ws/question`;
    console.log("Attempting to connect to: " + url);
    return url;
  }

  /**
   * Calls the onError callback if it exists.
   * @param {string} reason 
   * @private
   */
  _handleError(reason) {
    console.error(`QaWsManager error: ${JSON.stringify(reason)}`)
    if (this._options.callbacks.onError) {
      this._options.callbacks.onError(reason);
    }
  }

  _sendOpenMessage() {
    const payload = {
      question: this._options.question,
      lang: this._options.lang,
      id_token: this._options.idToken,
    };
    if (this._options.source) {
      payload.source = this._options.source;
    } else if (this._options.myWorks) {
      payload.my_works = this._options.myWorks;
    } else if (this._options.arcId) {
      payload.arc_id = this._options.arcId;
    } else {
      throw new Error("Either source, myWorks or arcId must be provided.");
    }
    this._ws.send(JSON.stringify(payload));
  }

  /**
   * Binds the WebSocket events to the provided callbacks.
   * @private
   */
  _bindEvents() {
    this._ws.onopen = (event) => {
      this._sendOpenMessage();
    };

    this._ws.onmessage = (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
      } catch (e) {
        const err = `Invalid JSON received from WebSocket: ${e} for message: ${event.data}`;
        this._handleError(err);
        return;
      }
      this._handleMessage(message);
    };
  }

  /**
   * Handles a message received from the WebSocket.
   * @param {Object | string} message - The parsed JSON message received from the WebSocket.
   * @private
   */
  _handleMessage(message) {
    if (message.sources) {
      this._options.callbacks.setSources(message.sources);
    } else if (message.error) {
      this._handleError(message.error);
    } else {
      const answerPiece = message.a;
      this.answer = this.answer + answerPiece;
      this._options.callbacks.setAnswer(this.answer);
    }
  }

  /**
   * Closes the WebSocket connection.
   */
  close() {
    this._ws.close();
  }
}

export default QaWsManager;
