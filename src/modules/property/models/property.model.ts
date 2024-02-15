import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PropertyCreateBody = PrismaClient.Args<typeof prisma.property, 'create'>['data'];
type PropertyUpdateBody = PrismaClient.Args<typeof prisma.property, 'update'>['data'];

export async function listProperties() {
	return await prisma.property.findMany();
  }
  
export async function getPropertyById(id: string) {
  return await prisma.property.findUnique({
    where: { id: id }
  });
}

export async function getPropertiesByWorkspaceId(workspaceId: string) {
  return await prisma.property.findMany({
    where: { workspaceId: parseInt(workspaceId) }
  });
}

export async function getPropertyReferences(propertyId: string) {
      return await prisma.property.findUnique({
          where: { id: parseInt(propertyId) },
          include: {
              propertyAnalysis: true
          }
      });
}

export async function createProperty(body: PropertyCreateBody) {
  return await prisma.property.create({
    data: body
  });
}

export async function updateProperty(id: string, body: PropertyUpdateBody) {
  return await prisma.property.update({
    where: { id: id },
    data: body
  });
}

export async function deleteProperty(id: string) {
  return await prisma.property.delete({
    where: { id: id }
  });
}
