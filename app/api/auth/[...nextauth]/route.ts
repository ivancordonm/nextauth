import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        const user = await res.json()

        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ]
})
