import { assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import app from "../../../api/api.routes.ts";

const request = await superoak(app);
let testUserId: string;

Deno.test("POST /api/users", async () => {
    try {
        const newUser = {
            email: "test@user.com",
            password: "password123"
        };
        
        const res = await request.post("/api/users").send(newUser)

        assertEquals(res.status, 200);
        assertEquals(Array.isArray(res.body), true);
    } catch(error) {
        console.log('ERROR: ', error);
    }
});

Deno.test("GET /api/users", async () => {
    try {
        const res = await request.get("/api/users");
        console.log('BODY: ', res.body)
        testUserId = res.body[0]._id;
    
        assertEquals(res.status, 200);
        assertEquals(Array.isArray(res.body), true);
    } catch(error) {
        console.log('ERROR: ', error)
    }
});

Deno.test("GET /api/users/:id", async () => {
    try {
        const res = await request.get(`/api/users/${testUserId}`);

        assertEquals(res.status, 200);
        assertEquals(typeof res.body, 'object');
        assertEquals(res.body._id, testUserId);
    } catch(error) {
        console.log('ERROR: ', error);
    }
});

Deno.test("PUT /api/users/:id", async () => {
    try {
        const updatedUser = {
            name: "Updated Test User",
            email: "updated@user.com",
            password: "updatedpassword123"
        };
        
            const res = await request.put(`/api/users/${testUserId}`).send(updatedUser);
        
            assertEquals(res.status, 200);
            assertEquals(res.body._id, testUserId);
            assertEquals(res.body.name, updatedUser.name);
            assertEquals(res.body.email, updatedUser.email);
    } catch(error) {
        console.log('ERROR: ', error);
    }
});

Deno.test("DELETE /api/users/:id", async () => {
    try {
        const res = await request.delete(`/api/users/${testUserId}`);

        assertEquals(res.status, 200);
        assertEquals(res.body._id, testUserId);
    } catch(error) {
        console.log('ERROR: ', error);
    }
});
