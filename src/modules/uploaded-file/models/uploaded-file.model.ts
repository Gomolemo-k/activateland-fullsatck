import { PrismaClient } from '@prisma/client';
import prisma from "../../../../client.ts";


type UploadedFileCreateBody = PrismaClient.Args<typeof prisma.uploadedFile, 'create'>['data'];
type UploadedFileUpdateBody = PrismaClient.Args<typeof prisma.uploadedFile, 'update'>['data'];

export async function listUploadedFiles() {
    return await prisma.uploadedFile.findMany();
}

export async function getUploadedFileById(id: number) {
    return await prisma.uploadedFile.findUnique({ 
		where: { id :id } 
	});
}

export async function createUploadedFile(body: UploadedFileCreateBody) {
    return await prisma.uploadedFile.create({ 
		data: body 
	});
}

export async function updateUploadedFile(id: number, body: UploadedFileUpdateBody) {
    return await prisma.uploadedFile.update({ 
		where: { id }, 
		data : body
	});
}

export async function deleteUploadedFile(id: number) {
    return await prisma.uploadedFile.delete({ 
		where: { id : id } 
	});
}

