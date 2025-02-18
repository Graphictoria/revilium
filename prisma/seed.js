import { randomBytes } from 'node:crypto';
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const invite = await prisma.invite.create({
		data: {
			value: `revilium-${randomBytes(16).toString('hex')}`
		}
	});

	// await prisma.user.create({
	// 	data: {
	// 		username: 'cirro',
	// 		email: 'cirroskais@madhouselabs.net',
	// 		password: await hash('burger', 10),
	// 		description: 'Auto-generated account',
	// 		role: 'DEVELOPER'
	// 	}
	// });

	// await prisma.user.create({
	// 	data: {
	// 		username: 'robin',
	// 		email: 'robin@viridis.lol',
	// 		password: await hash('burger', 10),
	// 		description: 'Auto-generated account',
	// 		role: 'DEVELOPER'
	// 	}
	// });

	console.log(`\n🛈  Generated new invite key: ${invite.value}`);
	console.log('\n');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})

	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
