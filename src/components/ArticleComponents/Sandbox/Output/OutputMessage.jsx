import ReactMarkdown from 'react-markdown'

export default function OutputMessage({ generatedPrompt }) {
  return (
    <div className="  w-fit   p-6 rounded-lg  right-0 flex flex-col border-zinc-200 dark:border-zinc-800 bg-white dark:bg-mildDarkMode">
      <ReactMarkdown>{generatedPrompt.split('"""')[1]}</ReactMarkdown>
    </div>
  )
}
