import ReactMarkdown from 'react-markdown'
import InputMessage from './InputMessage/InputMessage'
import OutputMessage from './OutputMessage'

export default function OutputZone({
  generatedPrompt,
  outputMessage,
  setActiveGenerationZone,
  promptType,
  createDopeStuff,
  userPrompt,
  isLoading,
  settings,
  contentDetails
}) {
  return (
    <div className="content-area   mt-6 max-w-[800px] px-4 sm:px-0 text-zinc-700 dark:text-zinc-300 overflow-y-auto   max-w-[1000px] flex flex-col ">
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
        userPrompt={userPrompt}
        settings = {settings}
        contentDetails = {contentDetails}
        
      />

      <div className="items-end  mt-10 w-full  flex max-w-[800px] pb-10 ">
        <OutputMessage
          generatedPrompt={generatedPrompt}
          setActiveGenerationZone={setActiveGenerationZone}
          outputMessage={outputMessage}
          createDopeStuff={createDopeStuff}
          isLoading={isLoading}
        />
      </div>

      <div>

      </div>
    </div>
  )
}
