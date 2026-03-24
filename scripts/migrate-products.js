const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const productsPath = path.join(__dirname, '../src/data/products.json');
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    console.log(`Found ${productsData.length} products to migrate.`);

    for (const p of productsData) {
        await prisma.product.create({
            data: {
                id: p.id,
                name: p.name,
                price: p.price,
                category: p.category,
                description: p.description,
                images: JSON.stringify(p.images),
                variants: JSON.stringify(p.variants),
                isFeatured: false, // Defaulting to false
                isHidden: false,   // Defaulting to false
            },
        });
        console.log(`Migrated product: ${p.name}`);
    }

    console.log('Migration completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
