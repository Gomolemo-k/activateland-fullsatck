import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type UserProfileCreateBody = PrismaClient.Args<typeof prisma.userprofile, 'create'>['data'];
type UserProfileUpdateBody = PrismaClient.Args<typeof prisma.userprofile, 'update'>['data'];

export async function listUserProfiles () {
  return await prisma.user.findMany();
}

export async function getUserProfileById(id: string) {
  return await prisma.user.findUnique({
    where: { id: id }
  });
}

export async function createUserProfile(data: UserProfileCreateBody) {
  return await prisma.user.create({
    data: data
  });
}

export async function updateUserProfile(id: string, data: UserProfileUpdateBody) {
  return await prisma.user.update({
    where: { id: id },
    data: data
  });
}

export async function deleteUserProfile(id: string) {
  return await prisma.user.delete({
    where: { id: id }
  });
}
