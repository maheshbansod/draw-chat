import { defineSchema, defineTable } from 'convex/server'
import { authTables } from '@convex-dev/auth/server'
import { v } from 'convex/values'

export default defineSchema({
  ...authTables,
  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),
  messages: defineTable({
    content: v.string(),
    type: v.union(v.literal('text'), v.literal('drawing')),
    author: v.string(),
    timestamp: v.number(),
  }).index('by_timestamp', ['timestamp']),
  profiles: defineTable({
    userId: v.string(),
    username: v.string(),
    displayName: v.string(),
    profilePicture: v.optional(v.string()),
    email: v.string(),
  })
    .index('by_userId', ['userId'])
    .index('by_username', ['username'])
    .index('by_email', ['email']),
})
