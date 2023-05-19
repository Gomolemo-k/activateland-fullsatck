import { assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";

let testUserId: string;

Deno.test("POST /api/users", async () => {
    try {
        const newUser = {
            name: "Test User",
            email: "test@user.com",
            password: "password123"
        };
    
        const res = await app.post("/api/users").send(newUser);
        assertEquals(res.status, 201);
        assertEquals(res.body.message, "User created successfully.");
    } catch(error) {
        console.log('ERROR: ', error);
    }
});

Deno.test("GET /api/users", async () => {
    try {
        const res = await app.get("/api/users");

        testUserId = res.body[0]._id;
    
        assertEquals(res.status, 200);
        assertEquals(Array.isArray(res.body), true);
    } catch(error) {
        console.log('ERROR: ', error)
    }
});

Deno.test("GET /api/users/:id", async () => {
    try {
        const res = await app.get(`/api/users/${testUserId}`);

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
        
            const res = await app.put(`/api/users/${testUserId}`).send(updatedUser);
        
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
        const res = await app.delete(`/api/users/${testUserId}`);

        assertEquals(res.status, 200);
        assertEquals(res.body._id, testUserId);
    } catch(error) {
        console.log('ERROR: ', error);
    }
});
