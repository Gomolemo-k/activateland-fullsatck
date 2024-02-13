import { PrismaClient } from '@prisma/client';
import prisma from "../../../../client.ts";

type UserSessionCreateBody = PrismaClient.Args<typeof prisma.userSession, 'create'>['data'];
type UserSessionUpdateBody = PrismaClient.Args<typeof prisma.userSession, 'update'>['data'];

export async function listUserSessions() {
    return await prisma.userSession.findMany();
}

export async function createUserSession(body: UserSessionCreateBody) {
    return await prisma.userSession.create({ 
		data: body
	});
}

export async function getUserSessionById(id: string) {
    return await prisma.userSession.findUnique({ 
		where: { id: id } 
	});
}

export async function updateUserSession(id: string, body: UserSessionUpdateBody) {
    return await prisma.userSession.update({ 
		where: { id:id }, 
		data: body
	});
}

export async function deleteUserSession(id: string) {
    return await prisma.userSession.delete({ 
		where: { id: id } 
	});
}