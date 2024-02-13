import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PropertyAnalysisCreateBody = PrismaClient.Args<typeof prisma.user, 'create'>['data'];
type PropertyAnalysisUpdateBody = PrismaClient.Args<typeof prisma.user, 'update'>['data'];

export async function listTeamMembers() {
  return await prisma.teamMember.findMany();
}

export async function createPropertyAnalysis(body: PropertyAnalysisCreateBody) {
  return await prisma.propertyAnalysis.create({
    data: body,
  });
}

export async function updatePropertyAnalysis(id: string, body: PropertyAnalysisUpdateBody  ) {
	return await prisma.propertyAnalysis.update({
	  where: { id: id },
	  data: body,
	});
  }

export async function getPropertyAnalysisById(id: string) {
  return await prisma.propertyAnalysis.findUnique({
    where: { id: id },
  });
}

export async function deletePropertyAnalysis(id: string) {
  return await prisma.propertyAnalysis.delete({
    where: { id: id },
  });
}

