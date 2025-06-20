import { PrismaClient } from "../../generated/prisma"



const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

export default prisma