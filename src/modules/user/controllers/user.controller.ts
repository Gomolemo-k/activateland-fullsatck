import { listUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser, userReferences } from "../models/user.model.ts";
import { User } from "../models/user.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const userNotFoundMessage = "User not found in database.";
const userDeletedMessage = "User deleted successfully.";
const internalServerErrorMessage = "Internal Server Error.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const users = await listUsers();
        ctx.response.body = users;
    } catch (error) {
        console.log('API ERROR USER list:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await getUserById(ctx.params?.id);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
            return;
        }
        ctx.response.body = user;
    } catch (error) {
        console.log('API ERROR USER get:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage };
    }
};

export const getByEmail = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await getUserByEmail(ctx.params?.email);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
            return;
        }
        ctx.response.body = user;
    } catch (error) {
        console.log('API ERROR USER getByEmail:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage };
    }
};

export const create = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        let user = await getUserByEmail(reqBody.email);
        if (!user) {
            user = await createUser(reqBody);
        }
        ctx.response.status = 201;
        ctx.response.body = user;
    } catch (error) {
        console.log('API ERROR USER create:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage };
    }
};

export const update = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const user = await updateUser(ctx.params?.id, reqBody);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
            return;
        }
        ctx.response.body = user;
    } catch (error) {
        console.log('API ERROR USER update:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage };
    }
};

export const destroy = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await deleteUser(ctx.params?.id);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
            return;
        }
        ctx.response.body = { message: userDeletedMessage };
    } catch (error) {
        console.log('API ERROR USER destroy:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage };
    }
};

export const getUserReferences = async (ctx: RouterContext<any, any>) => {
    try {
        const userId = ctx.params?.id;
        if (!userId) {
            ctx.response.status = 400;
            ctx.response.body = { message: "User ID is missing in the request." };
            return;
        }
        const user = await userReferences(userId);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
            return;
        }
        ctx.response.body = user;
    } catch (error) {
        console.log('API ERROR USER getUserReferences:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage };
    }
};