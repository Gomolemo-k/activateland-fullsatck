import User from "../models/user.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const userNotFoundMessage = "User not found in database.";
const iternalServerErrorMessage = "Internal Server Error.";
const userCreatedMessage = "User created successfully.";
const userDeletedMessage = "User deleted successfully.";

export const getUsers = async (ctx: RouterContext<any, any>) => {
    try {
        const users = await User.find();
        ctx.response.body = users;
    } catch (error) {
        console.log('API ERROR USER getUsers:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const getUser = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await User.findById(ctx.params?.id);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
        }
        ctx.response.body = user;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
  };

export const createUser = async (ctx: RouterContext<any, any>) => {
    try {
        //Get request body
        if (!ctx.request.hasBody) {
            ctx.throw(500);
        }
        const body = await ctx.request.body({ type: 'form-data'});
        const formData = await body.value.read();
        console.log(formData.fields);
        //Save new user.
        await new User({ ...formData.fields }).save();
        ctx.response.status = 201;
        ctx.response.body = { message: userCreatedMessage };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const updateUser = async (ctx: RouterContext<any, any>) => {
    try {
        //Get request body
        if (!ctx.request.hasBody) {
            ctx.throw(500);
        }
        const body = await ctx.request.body({ type: 'form-data'});
        const formData = await body.value.read();
        console.log(formData.fields);
        const user = await User.findByIdAndUpdate(ctx.params?.id, formData.fields, {
            new: true,
        });
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
        }
        return ctx.response.body = user;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const deleteUser = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await User.findByIdAndDelete(ctx.params?.id);
        if (!user) {
            ctx.response.status = 404;
            ctx.response.body = { message: userNotFoundMessage };
        }
        ctx.response.body = { message: userDeletedMessage };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};
