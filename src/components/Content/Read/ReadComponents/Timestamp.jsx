
import ReactMarkdown from "react-markdown";

export default function Timestamp({summaryArray, handleClickTimestamp, convertTimeToSeconds}){
    



    return(
        Object.values(summaryArray).map(
            (item, index) => (
              <div
                className="mb-4  text-slate-800  quicksand dark:text-slate-200"
                key={index}
              >
                <div className="text-l   dark:border-indigo-100 p-4">
                  <h3
                    className="text-xl mb-1 quicksand font-bold  underline text-slate-700 cursor-pointer dark:text-slate-200"
                    onClick={() =>
                      handleClickTimestamp(item.at)
                    }
                  >
                    {`${item.title}`}
                  </h3>
                  <h5
                    onClick={() =>
                      handleClickTimestamp(item.at)
                    }
                    className="mb-2 cursor-pointer"
                  >
                    {typeof item.at === "string" &&
                    item.at.match(/^PT/)
                      ? `${
                          Math.floor(
                            convertTimeToSeconds(
                              item.at
                            ) / 3600
                          ) < 10
                            ? `0${Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) / 3600
                              )}`
                            : `${Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) / 3600
                              )}`
                        }
                                                                        ${":"}
                                                                        ${
                          Math.floor(
                            convertTimeToSeconds(
                              item.at
                            ) / 60
                          ) < 10
                            ? `0${Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) / 60
                              )}`
                            : Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) % 3600
                              ) < 600
                            ? `0${Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) /
                                  60 -
                                  Math.floor(
                                    convertTimeToSeconds(
                                      item.at
                                    ) / 3600
                                  ) *
                                    60
                              )}`
                            : Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) /
                                  60 -
                                  Math.floor(
                                    convertTimeToSeconds(
                                      item.at
                                    ) / 3600
                                  ) *
                                    60
                              )
                        }
                                                                        ${":"}
                                                                        ${
                          Math.floor(
                            convertTimeToSeconds(
                              item.at
                            ) % 60
                          ) < 10
                            ? `0${Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) % 60
                              )}`
                            : Math.floor(
                                convertTimeToSeconds(
                                  item.at
                                ) % 60
                              )
                        }`
                      : `${
                          Math.floor(item.at / 3600) <
                          10
                            ? `0${Math.floor(
                                item.at / 3600
                              )}`
                            : `${Math.floor(
                                item.at / 3600
                              )}`
                        }
                                                                        ${":"}
                                                                        ${
                          Math.floor(item.at / 60) < 10
                            ? `0${Math.floor(
                                item.at / 60
                              )}`
                            : Math.floor(
                                item.at % 3600
                              ) < 600
                            ? `0${Math.floor(
                                item.at / 60 -
                                  Math.floor(
                                    item.at / 3600
                                  ) *
                                    60
                              )}`
                            : Math.floor(
                                item.at / 60 -
                                  Math.floor(
                                    item.at / 3600
                                  ) *
                                    60
                              )
                        }
                                                                        ${":"}
                                                                        ${
                          Math.floor(item.at % 60) < 10
                            ? `0${Math.floor(
                                item.at % 60
                              )}`
                            : Math.floor(item.at % 60)
                        }`}
                  </h5>

                  {item.summary
                    .split("\n")
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="quicksand font-normal text-slate-700 dark:text-slate-300 text-md mt-4"
                        >
                          <ReactMarkdown className="react-markdown-edit quicksand">
                            {item}
                          </ReactMarkdown>
                        </div>
                      );
                    })}
                </div>
              </div>
            )
          )
    )
}