import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {listPropertyAnalysis, listPropertyAnalysisByProperty,  getPropertyAnalysisById, createPropertyAnalysis, updatePropertyAnalysis, deletePropertyAnalysis } from "../models/property-analysis.model.ts";

const notFoundMessage = "Record not found in database.";
const internalServerErrorMessage = "Internal Server Error.";
const deletedMessage = "Record deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await listPropertyAnalysis();
        ctx.response.body = record;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: internalServerErrorMessage, error: error };
    }
};

export const getPropertyAnalysisByProperty = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await listPropertyAnalysisByProperty(ctx.params?.propertyId);
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

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const record = await getPropertyAnalysisById(ctx.params?.id);
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
        const record = createPropertyAnalysis(reqBody);
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
        const record = await updatePropertyAnalysis(ctx.params?.id, reqBody);
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
        const record = await deletePropertyAnalysis(ctx.params?.id);
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
