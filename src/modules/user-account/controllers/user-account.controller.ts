import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { listUserAccounts, getUserAccountById, createUserAccount, updateUserAccount, deleteUserAccount } from "../models/user-account.model.ts";

const notFoundMessage = "Record not found in database.";
const internalServerErrorMessage = "Internal Server Error.";
const createdMessage = "Record created successfully.";
const deletedMessage = "Record deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await listUserAccounts();
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await getUserAccountById(ctx.params?.id);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const create = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const record = createUserAccount(reqBody);
        await record.save();

        ctx.response.status = 201;
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const update = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const record = await updateUserAccount(ctx.params?.id, reqBody);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        return ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const destroy = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await deleteUserAccount(ctx.params?.id);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        ctx.response.body = { message: deletedMessage };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};
