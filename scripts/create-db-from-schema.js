const { PrismaClient } = require('@prisma/client');

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
        console.log('Connected to information_schema. Attempting to create kirana_cake...');
        await prisma.$executeRawUnsafe('CREATE DATABASE kirana_cake;');
        console.log('Database kirana_cake created successfully!');
    } catch (error) {
        console.error('Failed to create database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
