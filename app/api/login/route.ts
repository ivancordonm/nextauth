import prisma from '@/lib/prisma'
import * as bcrypt from 'bcrypt'

interface BodyRequest {
  username: string
  password: string
}

export async function POST(request: Request) {
  const body: BodyRequest = await request.json()
  const { username, password } = body

  const user = await prisma.user.findFirst({
    where: {
      email: username
    }
  })

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...userWithoutPass } = user
    return new Response(JSON.stringify(userWithoutPass), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return new Response(JSON.stringify(null), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
