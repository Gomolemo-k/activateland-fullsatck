import Project from "../models/project.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const notFoundMessage = "Record not found in database.";
const iternalServerErrorMessage = "Internal Server Error.";
const createdMessage = "Record created successfully.";
const deletedMessage = "Record deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await Project.find();
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const listByUser = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await Project.find({user: ctx.params?.userId});
        // console.log('record: ', record)
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const getProjectReferences = async (ctx: RouterContext<any, any>) => {
    try {
        const project = await Project.find({_id: ctx.params?.id})
        .populate(
            {
                path: 'teams',
                    model: 'Team',
                    populate: {
                        path: 'teamMembers',
                        model: 'TeamMembers',
                    }
            })
        .populate(
            {
                path: 'properties',
                     model: 'Property',
                     populate: {
                        path: 'propertyAnalysis',
                        model: 'PropertyAnalysis'
                   }
            });
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%getProjectReferences: ', project)
        ctx.response.body = project;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await Project.findById(ctx.params?.id);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const create = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const record = new Project(reqBody);
        await record.save();

        ctx.response.status = 201;
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const update = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const record = await Project.findByIdAndUpdate(ctx.params?.id, reqBody, {new: true});
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        return ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const destroy = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await Project.findByIdAndDelete(ctx.params?.id);
        if (!record) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        ctx.response.body = { message: deletedMessage };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};