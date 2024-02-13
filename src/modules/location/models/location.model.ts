import { PrismaClient } from '@prisma/client';
import prisma from "../../../../client.ts";

type LocationCreateBody = PrismaClient.Args<typeof prisma.location, 'create'>['data'];
type LocationUpdateBody = PrismaClient.Args<typeof prisma.location, 'update'>['data'];

export async function listLocations() {
    return await prisma.location.findMany();
}

export async function getLocationById(id: string) {
    return await prisma.location.findUnique({ 
		where: { id: id } 
	});
}

export async function createLocation(body: LocationCreateBody) {
    return await prisma.location.create({ 
		data: body
	});
}

export async function updateLocation(id: string, body: LocationUpdateBody) {
    return await prisma.location.update({ 
		where: { id: id}, 
		data: body
	});
}

export async function deleteLocation(id: string) {
    return await prisma.location.delete({ 
		where: { id: id } 
	});
}