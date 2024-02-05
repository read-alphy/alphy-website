import ReactMarkdown from 'react-markdown'
import working from '../../ContentTabs/working.svg'

export default function Output({
  generatedPrompt,
  outputMessage,
  setOutputMessage,
}) {
  return (
    <div className=" content-area p-10 overflow-y-auto max-h-[70vh] overflow-x-hidden max-w-[700px]">
      <ReactMarkdown>
        {/* {generatedPrompt} */}
        <img src={working} width={100} height={100} />
      </ReactMarkdown>
    </div>
  )
}
