const { PrismaClient } = require('@prisma/client');

// Use a simplified connection string to connect to the server, not a specific DB
const databaseUrl = "mysql://appuser:apppassword123@43.173.30.56:3306/mysql";

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
        console.log('Successfully connected to the MySQL server!');

        // Attempt to create the database if it doesn't exist
        await prisma.$executeRaw`CREATE DATABASE IF NOT EXISTS kirana_cake;`;
        console.log('Database kirana_cake created or already exists.');

    } catch (error) {
        console.error('Failed to connect or create database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
