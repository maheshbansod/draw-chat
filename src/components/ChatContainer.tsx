import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import { useAuth } from '@/hooks/useAuth'

export default function ChatContainer() {
  const messages = useQuery(api.messages.list) || []
  const sendMessage = useMutation(api.messages.send)
  const [isSending, setIsSending] = useState(false)
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Use authenticated user data or fallback
  const currentUser = (user as any)?.displayName || 'Anonymous User'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (
    content: string,
    type: 'text' | 'drawing',
  ) => {
    if (isSending) return

    setIsSending(true)
    try {
      await sendMessage({
        content,
        type,
        author: currentUser,
      })
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Drawing Chat</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Logged in as:</span>
            <span className="text-sm font-medium text-blue-600">
              {currentUser}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">Welcome to Drawing Chat!</p>
            <p className="text-sm">
              Start by typing a message or drawing something.
            </p>
          </div>
        ) : (
          <div>
            {messages.map((message: any) => (
              <MessageBubble
                key={message._id}
                message={message}
                isOwn={message.author === currentUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isSending} />
    </div>
  )
}
