import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface User {
  userId: string
  username: string
  displayName: string
  profilePicture?: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  signIn: (provider: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { signIn, signOut } = useAuthActions()
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // This is a placeholder - you'll need to implement getting current user ID from Convex auth
  // For now, we'll simulate it
  useEffect(() => {
    // Simulate checking auth state
    const checkAuth = async () => {
      try {
        // Replace with actual auth check
        // const authUser = await getCurrentUser()
        // setCurrentUserId(authUser?.id || null)
        setCurrentUserId(null) // Placeholder
      } catch (error) {
        console.error('Auth check failed:', error)
        setCurrentUserId(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const userProfile = useQuery(
    api.users.getUserProfile,
    currentUserId ? { userId: currentUserId } : 'skip',
  )

  const isAuthenticated = !!currentUserId && !!userProfile

  const value: AuthContextType = {
    isAuthenticated,
    user: userProfile || null,
    isLoading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
