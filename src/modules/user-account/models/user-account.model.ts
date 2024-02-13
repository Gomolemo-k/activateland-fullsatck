import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type UserAccountCreateBody = PrismaClient.Args<typeof prisma.userAccount, 'create'>['data'];
type UserAccountUpdateBody = PrismaClient.Args<typeof prisma.userAccount, 'update'>['data'];

export async function listUserAccounts() {
  return await prisma.userAccount.findMany();
}

export async function getUserAccountById(id: string) {
  return await prisma.userAccount.findUnique({
    where: { id: id },
    include: { user: true }
  });
}

export async function createUserAccount(body: UserAccountCreateBody) {
  return await prisma.userAccount.create({
    data: body 
  });
}

export async function updateUserAccount(id: string, body: UserAccountUpdateBody) {
  return await prisma.userAccount.update({
    where: { id: id },
    data: body
  });
}

export async function deleteUserAccount(id: string) {
  return await prisma.userAccount.delete({
    where: { id: id }
  });
}
