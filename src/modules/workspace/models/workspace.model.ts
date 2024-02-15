import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type WorkspaceCreateBody = PrismaClient.Args<typeof prisma.workspace, 'create'>['data'];
type WorkspaceUpdateBody = PrismaClient.Args<typeof prisma.workspace, 'update'>['data'];

export async function listWorkspaces() {
  return await prisma.workspace.findMany();
}

export async function getWorkspaceById(id: string) {
  return await prisma.workspace.findUnique({
    where: { id: id }
  });
}

export async function getWorkspaceReferences(workspaceId: string) {
  return await prisma.workspace.findUnique({
    where: { id: parseInt(workspaceId) },
    include: {
      teams: {
        include: {
          teamMembers: true
        }
      },
      properties: {
        include: {
          propertyAnalysis: true
        }
      }
    }
  });
}

export async function listWorkspacesByUser(userId: string) {
    return await prisma.workspace.findMany({
      where: {
        userId: parseInt(userId) 
      }
    });
  }

export async function createWorkspace(body: WorkspaceCreateBody) {
  return await prisma.workspace.create({
    data: body
  });
}

export async function updateWorkspace(id: string, body: WorkspaceUpdateBody) {
  return await prisma.workspace.update({
    where: { id: id },
    data: body,
  });
}

 export async function deleteWorkspace(id: string) {
  return await prisma.workspace.delete({
    where: { id: id }
  });
}