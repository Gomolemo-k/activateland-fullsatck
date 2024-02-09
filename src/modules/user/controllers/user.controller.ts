import { listUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser, userReferences } from "../models/user.model.ts";
import { RouterContext } from "https://deno.land/x/oak@v12.4.0/mod.ts";

const userNotFoundMessage = "User not found in database.";
const iternalServerErrorMessage = "Internal Server Error.";
const userCreatedMessage = "User created successfully.";
const userDeletedMessage = "User deleted successfully.";

export const list = async (ctx: RouterContext<any, any>) => {
    try {
        const users = await listUsers;
        ctx.response.body = users;
    } catch (error) {
        console.log('API ERROR USER getUsers:', error);
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const get = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await getUserById(ctx.params?.id);
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

export const getByEmail = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await getUserByEmail(ctx.params?.email);
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

export const create = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        //console.log('reqBody', reqBody);
        //const reqBodyJSON = await JSON.parse(reqBody);
        //console.log(reqBodyJSON, typeof reqBodyJSON);

        // const body = await ctx.request.body({ type: 'form-data'});
        // const formData = await body.value.read();
        // console.log(formData.fields);
        //Save new user.
        // await new User({ ...formData.fields }).save();

        //Find user if exist
        let user = await getUserByEmail(reqBody.email);
        if (!user) {
            //Create User
            user = await createUser(reqBody);
        }
    
        ctx.response.status = 201;
        ctx.response.body = user;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = { message: iternalServerErrorMessage, error: error };
    }
};

export const update = async (ctx: RouterContext<any, any>) => {
    try {
        const reqBody = await ctx.request.body().value;
        // console.log('ctx.params?.id', ctx.params?.id);
        // console.log('reqBody', reqBody);
        const user = await updateUser(ctx.params?.id, reqBody);
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

export const destroy = async (ctx: RouterContext<any, any>) => {
    try {
        const user = await deleteUser(ctx.params?.id);
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

export const getUserReferences = async (ctx: RouterContext<any, any>) => {
    try {
        const userId = ctx.params?.id;
        if (!userId) {
            ctx.response.status = 400;
            ctx.response.body = { message: "User ID is missing in the request." };
            return;
        }
        const user = await userReferences(userId);
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%getUserReferences: ', user)
       
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

