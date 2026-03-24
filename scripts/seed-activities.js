const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
    const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/news.json'), 'utf8'));

    console.log('Migrating news to activities...');

    for (const item of newsData) {
        await prisma.activity.create({
            data: {
                title: item.title,
                description: item.description,
                image: item.images && item.images.length > 0 ? item.images[0] : null,
                date: new Date(item.date),
                ctaText: item.ctaText || "Selengkapnya",
                ctaUrl: item.ctaUrl || "#",
                isHidden: false,
            }
        });
    }

    console.log('News migration completed.');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
