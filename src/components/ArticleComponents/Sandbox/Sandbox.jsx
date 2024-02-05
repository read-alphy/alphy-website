import React, { useState } from 'react'
import GenerationZone from './Generation/GenerationZone'
import OutputZone from './Output/OutputZone'

export default function Sandbox({ data }) {
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [outputMessage, setOutputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-[70vh] w-full max-w-[1200px] drop-shadow-sm  rounded-xl">
      
      <GenerationZone
        data={data}
        generatedPrompt={generatedPrompt}
        setGeneratedPrompt={setGeneratedPrompt}
        outputMessage={outputMessage}
        setOutputMessage={setOutputMessage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <OutputZone
        generatedPrompt={generatedPrompt}
        outputMessage={outputMessage}
        setOutputMessage={setOutputMessage}
      />
    </div>
  )
}
