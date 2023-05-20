import Project from "../models/project.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const notFoundMessage = "Project not found in database.";
const iternalServerErrorMessage = "Internal Server Error.";
const createdMessage = "Project created successfully.";
const deletedMessage = "Project deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const projects = await Project.find();
        ctx.response.body = projects;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const project = await Project.findById(ctx.params?.id);
        if (!project) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        ctx.response.body = project;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const create = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const project = new Project(reqBody);
        await project.save();

        ctx.response.status = 201;
        ctx.response.body = project;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const update = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        const project = await Project.findByIdAndUpdate(ctx.params?.id, reqBody, {new: true});
        if (!project) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        return ctx.response.body = project;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const destroy = async (ctx: RouterContext<any, any>) => {
    try {
        const project = await Project.findByIdAndDelete(ctx.params?.id);
        if (!project) {
            ctx.response.status = 404;
            ctx.response.body = { message: notFoundMessage };
        }
        ctx.response.body = { message: deletedMessage };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};
