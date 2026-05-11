import { useState, useRef, useCallback } from 'react'
import { Send, BotMessageSquare, Loader2, Copy, Check, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSource } from '../context/SourceContext'
import { useSourceUI } from '../context/UIContext'
import { useAuth } from '@/hooks/useAuth'
import { useWebSocket } from '../hooks/useWebSocket'
import ReactMarkdown from 'react-markdown'

export default function QAView() {
  const { source, summary } = useSource()
  const { seekToTimestamp } = useSourceUI()
  const { currentUser } = useAuth()
  const { connect, isLoading } = useWebSocket()
  
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  // Pre-generated questions from API
  const suggestedQuestions = summary?.key_qa ? Object.keys(summary.key_qa) : []
  console.log(summary)
  const handleSend = useCallback(async () => {
    if (!input.trim() || !currentUser || isLoading) return

    const question = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: question 
    }])

    // Add placeholder for assistant
    setMessages(prev => [...prev, { 
      type: 'assistant', 
      content: '',
      sources: [],
      isLoading: true
    }])

    // Connect to WebSocket
    connect(
      '/ws/question',
      {
        question,
        source: {
          source_type: source.source_type,
          source_id: source.source_id
        },
        id_token: currentUser.accessToken
      },
      (message) => {
        setMessages(prev => {
          const updated = [...prev]
          const lastIndex = updated.length - 1
          
          if (message.type === 'sources') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              sources: message.data
            }
          } else if (message.type === 'answer') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: message.data,
              isLoading: false
            }
          }
          
          return updated
        })
        
        // Scroll to bottom
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
      () => {
        // Mark loading complete
        setMessages(prev => {
          const updated = [...prev]
          if (updated.length > 0) {
            updated[updated.length - 1].isLoading = false
          }
          return updated
        })
      }
    )
  }, [input, currentUser, source, connect, isLoading])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInput(question)
    inputRef.current?.focus()
  }

  const handleCopy = (content, index) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleTimestampClick = (timestamp) => {
    seekToTimestamp(timestamp)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea className="flex-grow p-4">
        {messages.length === 0 ? (
          <EmptyState 
            suggestedQuestions={suggestedQuestions}
            onQuestionClick={handleSuggestedQuestion}
            hasUser={!!currentUser}
          />
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <MessageBubble 
                key={index}
                message={msg}
                onCopy={() => handleCopy(msg.content, index)}
                isCopied={copiedIndex === index}
                onTimestampClick={handleTimestampClick}
              />
            ))}
            <div ref={scrollRef} />
          </div>
        )}
      </ScrollArea>

      {/* Suggested Questions (when no messages) */}
      {messages.length === 0 && suggestedQuestions.length > 0 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestedQuestion(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 
                  text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700
                  transition-colors truncate max-w-[200px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        {currentUser ? (
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about this content..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
              Sign in to ask questions
            </p>
            <Button asChild size="sm">
              <a href="/u/login">Sign In</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ suggestedQuestions, onQuestionClick, hasUser }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <BotMessageSquare className="h-12 w-12 text-blue-500 dark:text-blue-400 mb-4" strokeWidth={1.5} />
      <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-2">
        Chat with this content
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
        Ask questions in any language and get answers based on the transcript.
      </p>
    </div>
  )
}

function MessageBubble({ message, onCopy, isCopied, onTimestampClick }) {
  const isUser = message.type === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : ''}`}>
        {/* Avatar */}
        <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            ${isUser 
              ? 'bg-indigo-100 dark:bg-indigo-900' 
              : 'bg-blue-100 dark:bg-blue-900'
            }
          `}>
            {isUser ? (
              <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <BotMessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          
          {/* Content */}
          <div className={`
            px-4 py-2 rounded-lg
            ${isUser 
              ? 'bg-indigo-500 text-white' 
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
            }
          `}>
            {message.isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
            
            {/* Copy button for assistant messages */}
            {!isUser && message.content && !message.isLoading && (
              <button
                onClick={onCopy}
                className="mt-2 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 ml-10">
            <p className="text-xs text-zinc-500 mb-1">Sources:</p>
            <div className="flex flex-wrap gap-1">
              {message.sources.map((source, i) => (
                <button
                  key={i}
                  onClick={() => onTimestampClick(source.at)}
                  className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 
                    text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                >
                  {source.at || `Source ${i + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

