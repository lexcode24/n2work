import inquirer from 'inquirer';
import {PrismaClient} from "@prisma/client";
import {hash} from "argon2";

const prisma = new PrismaClient();

async function main() {

    // Check First role in the database and create it if it doesn't exist
    const role = await prisma.role.findFirst();
    if (!role) {
        await prisma.role.create({
            data: {
                name: 'Admin',
            },
        });
    }

    // Check user with a role of Admin in the database and create it if it doesn't exist
    const user = await prisma.user.findFirst({
        where: {
            roles: {
                some: {
                    role: {
                        name: 'Admin',
                    },
                },
            },
        },
    });

    if (user) {
        console.log('Admin user already exists');
        return;
    }

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Enter admin email',
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter admin password',
        },
    ]);

    const { email, password } = answers;
    const hashedPassword = await hash(password);

    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            roles: {
                create: [
                    {
                        role: {
                            connect: {
                                id: 1,
                            },
                        },
                    },
                ]
            },
        },
    });

    console.log('Admin user created successfully');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });