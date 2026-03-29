const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const password = 'adminpassword123'; // User should change this
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const admin = await prisma.admin.upsert({
        where: { username },
        update: { passwordHash },
        create: {
            username,
            passwordHash,
        },
    });

    console.log('Admin user seeded successfully!');
    console.log('Username:', admin.username);
    console.log('Default Password: adminpassword123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
