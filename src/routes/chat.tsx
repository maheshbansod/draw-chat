import { createFileRoute } from '@tanstack/react-router'
import ChatContainer from '../components/ChatContainer'

export const Route = createFileRoute('/chat')({
  component: ChatComponent,
})

function ChatComponent() {
  return <ChatContainer />
}
