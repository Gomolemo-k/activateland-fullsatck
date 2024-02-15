import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PropertyAnalysisCreateBody = PrismaClient.Args<typeof prisma.propertyAnalysis, 'create'>['data'];
type PropertyAnalysisUpdateBody = PrismaClient.Args<typeof prisma.propertyAnalysis, 'update'>['data'];

export async function listPropertyAnalysis() {
	return await prisma.propertyAnalysis.findMany();
}
  
export async function listPropertyAnalysisByProperty(propertyId: string) {
     return await prisma.propertyAnalysis.findMany({
          where: {propertyId: parseInt(propertyId)}
      });
  } 

export async function getPropertyAnalysisById(id: string) {
  return await prisma.propertyAnalysis.findUnique({
    where: { id: id },
  });
}

export async function createPropertyAnalysis(body: PropertyAnalysisCreateBody) {
  return await prisma.propertyAnalysis.create({
    data: body,
  });
}

export async function updatePropertyAnalysis(id: string, body: PropertyAnalysisUpdateBody) {
  return await prisma.propertyAnalysis.update({
    where: { id: id },
    data: body,
  });
}

export async function deletePropertyAnalysis(id: string) {
  return await prisma.propertyAnalysis.delete({
    where: { id: id },
  });
}

