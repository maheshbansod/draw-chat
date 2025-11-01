import { query } from './_generated/server'

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      return null
    }

    // Get user profile
    const userProfile = await ctx.db
      .query('profiles')
      .withIndex('by_userId', (q) => q.eq('userId', identity.subject))
      .first()

    // Return both identity and profile info
    return {
      isAuthenticated: true,
      userId: identity.subject,
      email: identity.email || '',
      name: identity.name || '',
      profilePictureUrl: identity.pictureUrl,
      profile: userProfile,
    }
  },
})
