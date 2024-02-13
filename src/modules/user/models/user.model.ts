import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type UserCreateBody = PrismaClient.Args<typeof prisma.user, 'create'>['data'];
type UserUpdateBody = PrismaClient.Args<typeof prisma.user, 'update'>['data'];

export async function listUsers() { 
    return await prisma.user.findMany();
}

export async function updateOrCreateUser(body: UserCreateBody | UserUpdateBody) {
    const user = await prisma.user.upsert({
        where: { email: body.email },
        update: { data: body },
        create: { data: body }
    });
    return user;
}

export async function deleteUser(id: string) {
    return await prisma.user.delete({
        where: { id: parseInt(id) }
    });
}

export async function getUserReferences(userId: string) {
    return await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: {
            userAccount: true,
            userProfile: true,
            userSession: true,
            Workspaces: {
                include: {
                    teams: {
                        include: {
                            teamMembers: true
                        }
                    }
                }
            },
            workspaces: {
                include: {
                    properties: {
                        include: {
                            propertyAnalysis: true
                        }
                    }
                }
            }
        }
    });
}

export const validate = (data: { email: string, password: string }) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

export function generateRandomPassword(): string {
    const randomString = Math.random().toString(36).slice(-8);
    return randomString;
}

async function hashPassword(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(Deno.env.get('SALT') || '8'));
    const hashPass = await bcrypt.hash(pass, salt);
    return hashPass;
}
