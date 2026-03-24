const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
    const storeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/store.json'), 'utf8'));

    const data = {
        name: storeData.name,
        tagline: storeData.tagline,
        description: storeData.description,
        whatsappNumber: storeData.whatsappNumber,
        whatsappMessage: storeData.whatsappMessage,
        tokopediaUrl: storeData.tokopediaUrl,
        instagram: storeData.instagram,
        mapsUrl: storeData.mapsUrl,
        fullAddress: storeData.fullAddress,
        rating: storeData.rating,
        reviewCount: storeData.reviewCount,
        soldCount: storeData.soldCount,
        lat: storeData.coordinates.lat,
        lng: storeData.coordinates.lng,
    };

    const exists = await prisma.storeConfig.findUnique({
        where: { id: 1 }
    });

    if (exists) {
        console.log('Store config already exists. Updating...');
        await prisma.storeConfig.update({
            where: { id: 1 },
            data
        });
    } else {
        console.log('Creating store config...');
        await prisma.storeConfig.create({
            data: {
                id: 1,
                ...data
            }
        });
    }

    console.log('Store config seed completed.');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
