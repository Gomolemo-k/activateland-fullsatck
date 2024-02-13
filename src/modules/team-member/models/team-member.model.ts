import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TeamMemberCreateBody = PrismaClient.Args<typeof prisma.teamMember, 'create'>['data']
type TeamMemberUpdateBody = PrismaClient.Args<typeof prisma.teamMember, 'update'>['data']

export async function listTeams() {
    return await prisma.team.findMany();
}

export async function createTeamMember(userId: string, role: string) {
  return await prisma.teamMember.create({
    data: {
      user: { connect: { id: userId } },
      role: role,
    },
  });
}

export async function updateTeamMember(id: string, role: string) {
	return await prisma.teamMember.update({
	  where: { id: id },
	  data: {
		role: role,
	  },
	});
  }

export async function getTeamMemberById(id: string) {
  return await prisma.teamMember.findUnique({
    where: { id: id },
  });
}

export async function deleteTeamMember(id: string) {
  return await prisma.teamMember.delete({
    where: { id: id },
  });
}