import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

interface MessagePaginationProps {
  chatId: Id<'chats'>
  children: (
    messages: Array<any>,
    loadMore: () => void,
    hasMore: boolean,
    loadingMore: boolean,
  ) => React.ReactNode
}

export default function MessagePagination({
  chatId,
  children,
}: MessagePaginationProps) {
  const [allMessages, setAllMessages] = useState<Array<any>>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState<number | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)

  // Initial load of messages
  const initialMessages = useQuery(
    api.chatMessages.getChatMessagesPaginated,
    initialLoad ? { chatId, limit: 10 } : 'skip',
  )

  // Load more messages
  const olderMessages = useQuery(
    api.chatMessages.getChatMessagesPaginated,
    nextCursor && loadingMore
      ? { chatId, limit: 10, cursor: nextCursor }
      : 'skip',
  )

  // Handle initial load
  useEffect(() => {
    if (initialMessages && initialLoad) {
      setAllMessages(initialMessages.messages)
      setHasMore(initialMessages.hasMore)
      setNextCursor(initialMessages.nextCursor)
      setInitialLoad(false)
    }
  }, [initialMessages, initialLoad])

  // Handle loading more messages
  useEffect(() => {
    if (olderMessages && loadingMore) {
      setAllMessages((prev) => [...olderMessages.messages, ...prev])
      setHasMore(olderMessages.hasMore)
      setNextCursor(olderMessages.nextCursor)
      setLoadingMore(false)
    }
  }, [olderMessages, loadingMore])

  // Reset when chatId changes
  useEffect(() => {
    setAllMessages([])
    setHasMore(true)
    setNextCursor(null)
    setInitialLoad(true)
    setLoadingMore(false)
  }, [chatId])

  const loadMore = useCallback(() => {
    if (hasMore && nextCursor && !loadingMore) {
      setLoadingMore(true)
    }
  }, [hasMore, nextCursor, loadingMore])

  const isLoading = initialLoad && initialMessages === undefined

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading messages...</p>
        </div>
      </div>
    )
  }

  return <>{children(allMessages, loadMore, hasMore, loadingMore)}</>
}
