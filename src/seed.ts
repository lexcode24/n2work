import {PrismaClient} from "@prisma/client";
import * as process from "node:process";
import {faker} from "@faker-js/faker"
import {hash} from "argon2";


const prisma = new PrismaClient()

async function main() {
    const NUM_USERS = 50
    for (let i = 0; i < NUM_USERS; i++) {
        const email = faker.internet.email()
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const password = await hash('123456')
        const createdAt = faker.date.past({ years: 1 })
        const updatedAt = new Date(
            createdAt.getTime() +
            Math.random() * (new Date().getTime() - createdAt.getTime())
        )

        await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password,
                createdAt,
                updatedAt
            },
        })
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })