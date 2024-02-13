import { PrismaClient } from '@prisma/client';
import bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import jwt from 'https://deno.land/x/djwt@9.0.0/mod.ts';
import Joi from 'https://deno.land/x/joi@17.9.2/mod.ts';

const prisma = new PrismaClient();

type UserCreateBody = PrismaClient.Args<typeof prisma.user, 'create'>['data'];
type UserUpdateBody = PrismaClient.Args<typeof prisma.user, 'update'>['data'];

export async function listUsers() { 
    return await prisma.user.findMany();
}

export async function getUserById(id: string) {
    return await prisma.user.findUnique({
        where: { id: id }     
    })  
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email: email }
    })
}

export async function createUser(body: UserCreateBody) {
    const hashedPassword = await hashPassword(body.password);
    body.password = hashedPassword; 
    return prisma.user.create({
        data: body
    });
}

export async function updateUser(id: string, body: UserUpdateBody) {
    const hashedPassword = body.password ? await hashPassword(body.password) : undefined;
    if (hashedPassword !== undefined) {
        body = { ...body, password: hashedPassword };
    }
    return prisma.user.update({
        where: { id },
        data: body
    });
}

export async function updateOrCreateUser(body: UserUpdateBody) {
    const hashedPassword = body.password ? await hashPassword(body.password) : undefined;
    if (hashedPassword !== undefined) {
        body = { ...body, password: hashedPassword };
    }
    return prisma.user.upsert({
        where: { email: body.email },
        update: {data: body },
        create: {data: body}
    });
}

export async function deleteUser(id: string){
    return await prisma.user.delete({
        where: { id: id }
    })
}

export async function  getUserReferences(userId: string)
        const user = await prisma.user.findUnique({
            where: { id: userId },
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
};