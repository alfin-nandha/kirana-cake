const { PrismaClient } = require('@prisma/client');

// Connect to information_schema to see if we can log in at all
const databaseUrl = "mysql://appuser:apppassword123@43.173.30.56:3306/information_schema";

async function main() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });

    try {
        await prisma.$connect();
        console.log('Successfully connected to information_schema!');
    } catch (error) {
        console.error('Failed to connect to information_schema:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
