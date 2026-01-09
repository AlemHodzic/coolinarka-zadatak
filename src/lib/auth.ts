import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Default secret for local development - MUST be set in production via AUTH_SECRET env var
  secret: process.env.AUTH_SECRET || 'default-secret-do-not-use-in-production-12345',
  trustHost: true,
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const username = credentials.username as string
        const password = credentials.password as string

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@coolinarika.com'
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
})

