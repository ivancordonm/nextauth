import AppBar from '@/app/components/AppBar'
import './globals.css'
import Providers from '@/app/components/Providers'

export const metadata = {
  title: 'Next-Auth Tutorial',
  description: 'A tutorial on how to use Next-Auth with Next.js and Prisma.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
