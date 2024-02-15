import {listWorkspaces, listWorkspacesByUser, getWorkspaceById, createWorkspace, updateWorkspace, deleteWorkspace,  } from "../models/workspace.model.ts";
import Workspace from "../models/workspace.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const notFoundMessage = "Record not found in database.";
const internalServerErrorMessage = "Internal Server Error.";
const createdMessage = "Record created successfully.";
const deletedMessage = "Record deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const records = await listWorkspaces();
        ctx.response.body = records;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const listByUser = async (ctx: RouterContext<any, any>) => {
    try {
        const records = await listWorkspacesByUser(ctx.params?.userId);
        ctx.response.body = records;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await getWorkspaceById(ctx.params?.id);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
            return;
        }
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const getWorkspaceReferences = async (ctx: RouterContext<any, any>) => {
    try {
        const workspace = await getWorkspaceById(ctx.params?.id)
        if (!workspace) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        ctx.response.body = workspace;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};


export const create = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const record = createWorkspace(reqBody);
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
        const record = await updateWorkspace(ctx.params?.id, reqBody);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
            return;
        }
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const destroy = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await deleteWorkspace(ctx.params?.id);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
            return;
        }
        ctx.response.body = { message: deletedMessage };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

