import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TeamCreateBody = PrismaClient.Args<typeof prisma.Team, 'create'>['data'];
type TeamUpdateBody = PrismaClient.Args<typeof prisma.Team, 'update'>['data'];

export async function listTeams() {
    return await prisma.team.findMany();
}

export async function getTeamById(id: string) {
    return await prisma.team.findUnique({
        where: { id: id }
    });
}

export async function getTeamReferences(teamId: string) {
    return await prisma.team.findUnique({
        where: { id: parseInt(teamId) },
        include: {
            teamMembers: true 
        }
    });
}

export async function createTeam(body: TeamCreateBody) {
    return await prisma.team.create({
        data: body
    });
}

export async function updateTeam(id: string, body: TeamUpdateBody) {
    return await prisma.team.update({
        where: { id: id },
        data: body,
    });
}

export async function deleteTeam(id: string) {
    return await prisma.team.delete({
        where: { id: id }
    });
}