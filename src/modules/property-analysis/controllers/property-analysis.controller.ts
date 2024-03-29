import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import PropertyAnalysis from "../models/property-analysis.model.ts";

const notFoundMessage = "Record not found in database.";
const iternalServerErrorMessage = "Internal Server Error.";
const createdMessage = "Record created successfully.";
const deletedMessage = "Record deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await PropertyAnalysis.find();
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const listPropertyAnalysisByProperty = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await PropertyAnalysis.find({property: ctx.params?.propertyId});
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await PropertyAnalysis.findById(ctx.params?.id);
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
        const record = new PropertyAnalysis(reqBody);
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
        const record = await PropertyAnalysis.findByIdAndUpdate(ctx.params?.id, reqBody, {new: true});
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
        const record = await PropertyAnalysis.findByIdAndDelete(ctx.params?.id);
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
