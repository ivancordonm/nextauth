import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3000/api/login', {
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
  ],
  callbacks: {
    async jwt(params) {
      // console.log('*************')
      // console.log(params)
      // console.log('*************')
      return { ...params.token, ...params.user }
    },

    async session({ session, token }) {
      // console.log('*************')
      // console.log('session')
      // console.log(session)
      // console.log('*************')
      session.user = token as any
      return session
    }
  }
})

export { handler as GET, handler as POST }
