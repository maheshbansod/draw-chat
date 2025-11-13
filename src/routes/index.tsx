import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Lock, MessageSquare, Users } from 'lucide-react'
import ChatsList from '../components/ChatsList'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <ChatsList />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple Private Chat
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with friends through secure, private conversations. No
            distractions, just real messaging.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            <MessageSquare size={24} />
            Get Started
            <ArrowRight size={24} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Connect with Friends
            </h3>
            <p className="text-gray-600 mb-4">
              Start private conversations with people you know. Simple, direct,
              and focused on meaningful connections.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                One-on-one private chats
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Real-time messaging
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Clean, distraction-free interface
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Privacy First
            </h3>
            <p className="text-gray-600 mb-4">
              Your conversations are private and secure. We prioritize your
              privacy above everything else.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Secure authentication
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Private conversations only
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                No data tracking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
