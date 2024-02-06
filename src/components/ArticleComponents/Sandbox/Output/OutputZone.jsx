import ReactMarkdown from 'react-markdown'
import working from '../../ContentTabs/working.svg'
import InputMessage from './InputMessage/InputMessage'
import OutputMessage from './OutputMessage'

export default function Output({
  generatedPrompt,
  outputMessage,
  setOutputMessage,
  activeGenerationZone,
  setActiveGenerationZone,
  promptType,
  createDopeStuff,
}) {
  return (
    <div className="content-area   max-w-[800px] text-zinc-700 dark:text-zinc-300 overflow-y-auto   max-w-[1000px] flex flex-col ">
      <div className="flex flex-col ">
        {/*  <InputMessage
          promptType={promptType}
          generatedPrompt={generatedPrompt}
        /> */}

        {/*  <img
          className={'opacity-70 dark:opacity-90 mx-auto '}
          src={working}
          alt="My SVG"
        /> */}
        {/* <p className="text-center">
          Alphy is doing its best to generate the content for you. This may take
          a few seconds.
        </p> */}
      </div>
      <InputMessage
        promptType={promptType}
        generatedPrompt={generatedPrompt}
        setActiveGenerationZone={setActiveGenerationZone}
      />

      <div className="items-end  mt-10 w-full  flex max-w-[1000px]">
        <OutputMessage
          generatedPrompt={generatedPrompt}
          setActiveGenerationZone={setActiveGenerationZone}
        />
      </div>

      <div>
        {' '}
        <ReactMarkdown>{generatedPrompt} </ReactMarkdown>
      </div>
    </div>
  )
}
