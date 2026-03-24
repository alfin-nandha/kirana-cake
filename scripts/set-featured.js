const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Set the first 6 products as featured so the landing page isn't empty
    const products = await prisma.product.findMany({
        take: 6,
        orderBy: { id: 'asc' }
    });

    for (const p of products) {
        await prisma.product.update({
            where: { id: p.id },
            data: { isFeatured: true }
        });
        console.log(`Set ${p.name} as featured.`);
    }

    console.log('Update completed.');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
