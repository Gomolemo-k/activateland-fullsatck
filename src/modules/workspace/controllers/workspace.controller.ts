import Workspace from "../models/workspace.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const notFoundMessage = "Record not found in database.";
const internalServerErrorMessage = "Internal Server Error.";
const createdMessage = "Record created successfully.";
const deletedMessage = "Record deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const records = await Workspace.find();
        ctx.response.body = records;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const listByUser = async (ctx: RouterContext<any, any>) => {
    try {
        const records = await Workspace.find({ user: ctx.params?.userId });
        ctx.response.body = records;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const getWorkspaceReferences = async (ctx: RouterContext<any, any>) => {
    try {
        const workspace = await Workspace.findById(ctx.params?.id)
            .populate({
                path: 'teams',
                model: 'Team',
                populate: {
                    path: 'teamMembers',
                    model: 'TeamMembers',
                }
            })
            .populate({
                path: 'properties',
                model: 'Property',
                populate: {
                    path: 'propertyAnalysis',
                    model: 'PropertyAnalysis'
                }
            });
        ctx.response.body = workspace;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await Workspace.findById(ctx.params?.id);
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

export const create = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const record = new Workspace(reqBody);
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
        const record = await Workspace.findByIdAndUpdate(ctx.params?.id, reqBody, { new: true });
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
        const record = await Workspace.findByIdAndDelete(ctx.params?.id);
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
