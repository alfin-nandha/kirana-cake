import prisma from './src/lib/prisma.js';

async function test() {
    try {
        const count = await prisma.activity.count();
        console.log('Successfully connected to Prisma Activity model. Count:', count);
    } catch (err) {
        console.error('Failed to connect to Prisma Activity model:', err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

test();
