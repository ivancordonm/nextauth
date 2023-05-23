import prisma from '@/lib/prisma'
import { verifyJwtAccessToken } from '@/lib/jwt'
import { error } from 'console'

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const accessToken = request.headers.get('authorization')
  if (!accessToken || !verifyJwtAccessToken(accessToken)) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const userPosts = await prisma.post.findMany({
    where: {
      authorId: +params.id
    },
    include: {
      author: {
        select: {
          email: true,
          name: true
        }
      }
    }
  })

  if (!userPosts) {
    return new Response(JSON.stringify(null), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return new Response(JSON.stringify(userPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
