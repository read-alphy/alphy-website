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
    <div className="h-screen mt-6 w-full px-4  text-zinc-700 dark:text-zinc-300 overflow-y-auto   flex flex-col ">
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

      <div className="items-end  mt-10 w-full w-full flex pb-10 ">
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
