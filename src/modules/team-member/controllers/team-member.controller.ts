import { listTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember  } from "../models/team-member.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const notFoundMessage = "Record not found in database.";
const internalServerErrorMessage = "Internal Server Error.";
const deletedMessage = "Record deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await listTeamMembers();
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await getTeamMemberById(ctx.params?.id);
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
        const record =  createTeamMember(ctx.params?.id, reqBody);
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
        const record = await updateTeamMember(ctx.params?.id, reqBody);
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
        const record = await deleteTeamMember(ctx.params?.id);
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
