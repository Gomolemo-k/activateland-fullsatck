import { assert, assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import app from "../../../api/api.routes.ts";
import { connectToDatabase } from "../../../database/db.ts";

//const mongoose = await connectToDatabase();
// const request = await superoak(app);
let testUserId: string;
let testUserEmail: string;
const newUser = {
    email: "test@user.com",
    password: "password123"
};

Deno.test("POST /api/users", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        try {
            // let res = await request.get(`/api/user-email/${newUser.email}`);
            // console.log('POST BODY: ', res.body);
            // if (res.status === 200) {
            //     await request.delete(`/api/users/${res.body._id}`);
            // }
            const res = await request.post("/api/users").send(newUser);
            // console.log('POST BODY: ', res.body);
            // console.log('newUser.email', newUser.email);
            // console.log('res.body.email', res.body.email);

            assertEquals(res.body.email, newUser.email);
            assertEquals(typeof res.body._id, "string");

            testUserId = res.body._id;
            testUserEmail = res.body.email;
        } catch(error) {
            console.log('ERROR: ', error);
        }
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("GET /api/users", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        try {
            const res = await request.get("/api/users");
            //console.log('GET BODY: ', res.body);
        
            assertEquals(res.status, 200);
            assertEquals(typeof res.body[0].email, "string");
            assertEquals(typeof res.body[0]._id, "string");
        } catch(error) {
            console.log('ERROR: ', error)
        }
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("GET /api/users/:id", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        try {
            const res = await request.get(`/api/users/${testUserId}`);

            assertEquals(res.status, 200);
            assertEquals(typeof res.body._id, "string");
            assertEquals(res.body._id, testUserId);
        } catch(error) {
            console.log('ERROR: ', error);
        }
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("GET /api/user-email/:email", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        try {
            const res = await request.get(`/api/user-email/${testUserEmail}`);
            // console.log('GET /api/user-email/:email res: ', res);
            assertEquals(res.status, 200);
            assertEquals(typeof res.body._id, "string");
            assertEquals(res.body._id, testUserId);
        } catch(error) {
            console.log('ERROR: ', error);
        }
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("GET /api/user-references/:id", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        try {
            const res = await request.get(`/api/user-references/${testUserId}`);
            // console.log(res.body);

            // assertEquals(res.status, 200);
            // assertEquals(typeof res.body._id, "string");
            // assertEquals(res.body._id, testUserId);
        } catch(error) {
            console.log('ERROR: ', error);
        }
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("POST /api/users/:id existing user return user", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        try {
            const res = await request.post("/api/users").send(newUser);
            // console.log('POST BODY: ', res.body);
            // console.log('newUser.email', newUser.email);
            // console.log('res.body.email', res.body.email);
        
            assertEquals(res.status, 201);
            assertEquals(res.body._id, testUserId);
            assertEquals(res.body.email, newUser.email);
        } catch(error) {
            console.log('ERROR: ', error);
        }
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("PUT /api/users/:id", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        try {
            const updatedUser = {
                email: "updated@user.com",
                password: "updatedpassword123"
            };
            
            const res = await request.put(`/api/users/${testUserId}`).send(updatedUser);
            // console.log('res: ', res);
            // console.log('PUT BODY: ', res.body);
            // console.log('updatedUser.email', updatedUser.email);
            // console.log('res.body.email', res.body.email);
        
            assertEquals(res.status, 200);
            assertEquals(res.body._id, testUserId);
            assertEquals(res.body.email, updatedUser.email);
        } catch(error) {
            console.log('ERROR: ', error);
        }
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("DELETE /api/users/:id", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
        if (mongoose && isConnected) {
            const request = await superoak(app);
        try {
            const res = await request.delete(`/api/users/${testUserId}`);

            assertEquals(res.status, 200);
            assertEquals(typeof res.body.message, "string");
        } catch(error) {
            console.log('ERROR: ', error);
        }
        request.delete;
        await mongoose.disconnect();
    }        
});
