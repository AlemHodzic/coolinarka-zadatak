import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Require environment variables - no hardcoded defaults
function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: getRequiredEnv('AUTH_SECRET'),
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

        // Compare with environment variables
        const adminUsername = getRequiredEnv('ADMIN_USERNAME')
        const adminPassword = getRequiredEnv('ADMIN_PASSWORD')

        if (username === adminUsername && password === adminPassword) {
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
