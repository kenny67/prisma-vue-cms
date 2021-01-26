import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    await prisma.user.create({
      data: {
        name: 'Test',
        email: 'test@mysite.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like You' },
        },
      },
    })
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    })
    console.dir(allUsers, { depth: null })
  }

// const prisma = new PrismaClient()
// async function main() {
//   // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)

// }


main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })