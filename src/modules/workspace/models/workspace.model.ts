 import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createWorkspace(name: string, description?: string, userId: number) {
  return await prisma.workspace.create({
    data: {
      name,
      description,
      userId,
    },
  });
}

async function getWorkspaces() {
  return await prisma.workspace.findMany();
}

async function getWorkspaceById(id: number) {
  return await prisma.workspace.findUnique({
    where: {
      id,
    },
  });
}

async function updateWorkspace(id: number, newData: { name?: string; description?: string }) {
  return await prisma.workspace.update({
    where: {
      id,
    },
    data: newData,
  });
}

async function deleteWorkspace(id: number) {
  return await prisma.workspace.delete({
    where: {
      id,
    },
  });
}
