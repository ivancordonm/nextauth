import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
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

  console.log('id', params.id)
  console.log(userPosts)

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
