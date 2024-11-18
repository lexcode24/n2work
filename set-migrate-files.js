import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, './src');
const targetDir = path.join(__dirname, './prisma/schema');

async function findPrismaFiles(dir) {
    let prismaFiles = [];
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
        const res = path.resolve(dir, file.name);
        if (file.isDirectory()) {
            prismaFiles = prismaFiles.concat(await findPrismaFiles(res));
        } else if (file.name.endsWith('.prisma')) {
            prismaFiles.push(res);
        }
    }
    return prismaFiles;
}

async function copyPrismaFiles() {
    try {

        const files = await findPrismaFiles(sourceDir);
        for (const file of files) {
            const fileName = path.basename(file);
            const targetPath = path.join(targetDir, fileName);

            if (!fs.existsSync(targetPath) || fs.readFileSync(file, 'utf8') !== fs.readFileSync(targetPath, 'utf8')) {
                await fs.copy(file, targetPath);
            }
        }
    } catch (err) {
        console.error('Error by copy a .prisma files:', err);
    }
}

copyPrismaFiles();