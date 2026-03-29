import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    // eslint-disable-next-line no-var
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// Log successful database connection at startup
prisma.$connect().then(() => {
    console.log('✓ Service already connected to database MySQL at startup')
}).catch((error) => {
    console.error('✗ Failed to connect to database:', error)
})

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
