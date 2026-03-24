const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
    const reviewsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/reviews.json'), 'utf8'));

    console.log('Migrating reviews...');

    for (const item of reviewsData) {
        await prisma.review.create({
            data: {
                userName: item.user,
                rating: item.rating,
                comment: item.comment,
                date: item.date,
                isHidden: false,
            }
        });
    }

    console.log('Reviews migration completed.');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
