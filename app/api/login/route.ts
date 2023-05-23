import { singJwtAccessToken } from '@/lib/jwt'
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
    const accessToken = singJwtAccessToken(userWithoutPass)
    const result = { ...userWithoutPass, accessToken }
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return new Response(JSON.stringify(null), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
