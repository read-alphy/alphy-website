import { useState, useCallback, useRef } from 'react'
import { getWebSocketUrl } from '../utils/api'

/**
 * Generic WebSocket hook for streaming responses
 */
export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const wsRef = useRef(null)
  const responseRef = useRef('')

  const connect = useCallback((path, payload, onMessage, onComplete) => {
    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close()
    }

    setIsLoading(true)
    setError(null)
    responseRef.current = ''

    const url = getWebSocketUrl(path)
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      ws.send(JSON.stringify(payload))
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
          return
        }
        
        // Handle different message types
        if (data.sources) {
          // Q&A sources
          onMessage({ type: 'sources', data: data.sources })
        } else if (data.a) {
          // Streaming answer piece
          responseRef.current += data.a
          onMessage({ type: 'answer', data: responseRef.current })
        } else {
          // Generic message (for sandbox)
          responseRef.current += event.data
          onMessage({ type: 'text', data: responseRef.current })
        }
      } catch (e) {
        // Plain text message
        responseRef.current += event.data
        onMessage({ type: 'text', data: responseRef.current })
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      setIsLoading(false)
      onComplete?.(responseRef.current)
    }

    ws.onerror = (e) => {
      console.error('WebSocket error:', e)
      setError('Connection error')
      setIsLoading(false)
    }

    // Auto-close after timeout
    setTimeout(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }, 60000) // 60 second timeout

    return ws
  }, [])

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  return {
    connect,
    disconnect,
    isConnected,
    isLoading,
    error
  }
}

