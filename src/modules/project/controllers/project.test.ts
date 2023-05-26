import { assert, assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import app from "../../../api/api.routes.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";

//Save ids
let testUserId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent User", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {

        //Get user
        const userEmail = "test@example.com";
        let foundUser = await User.findOne({ email: userEmail });
        if (!foundUser) {
            //Create user
            foundUser = new User({ email: userEmail });
            await foundUser.save();
        }
        // console.log('foundUser._id: ', foundUser?._id.toString());
        //Save user id
        testUserId = foundUser._id.toString();
        dataNew = {
            user: testUserId,
            name: "New Project",
            description: "Description of the new project.",
        };
        assertEquals(dataNew?.user, testUserId);
        
        // Disconnect services
        await mongoose.disconnect();
    }
});

Deno.test("POST /api/projects", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        
        try {
            const res = await request.post("/api/projects").send(dataNew);
            //console.log('POST BODY: ', res.body);

            assertEquals(res.status, 201);
            assertEquals(res.body.user, testUserId);
            assertEquals(res.body.name, dataNew.name);
            assertEquals(res.body.description, dataNew.description);
        
            testModelId = res.body._id;
        } catch(error) {
            console.log('ERROR: ', error);
        }
        
        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("GET /api/projects", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.get("/api/projects");
            // console.log('GET BODY: ', res.body);
        
            assertEquals(res.status, 200);
            assertEquals(typeof res.body[0]._id, "string");
            assertEquals(typeof res.body[0].name, "string");
        } catch(error) {
            console.log('ERROR: ', error)
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("GET /api/projects/:id", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.get(`/api/projects/${testModelId}`);

            assertEquals(res.status, 200);
            assertEquals(typeof res.body._id, "string");
            assertEquals(typeof res.body.name, "string");
            assertEquals(res.body._id, testModelId);
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("GET /api/projects-user/:user", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.get(`/api/projects-user/${testUserId}`);
            // console.log('GET BODY: ', res);
        
            assertEquals(res.status, 200);
            assertEquals(res.body[0].user, testUserId);
        } catch(error) {
            console.log('ERROR: ', error)
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("PUT /api/projects/:id", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        
        try {
            const dataUpdate = {
                user: testUserId,
                name: "Update Project",
                description: "Description of the updated project.",
            };
            
            const res = await request.put(`/api/projects/${testModelId}`).send(dataUpdate);
        
            assertEquals(res.status, 200);
            assertEquals(res.body._id, testModelId);
            assertEquals(res.body.name, dataUpdate.name);
            assertEquals(res.body.description, dataUpdate.description);
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test("DELETE /api/projects/:id", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.delete(`/api/projects/${testModelId}`);

            assertEquals(res.status, 200);
            assertEquals(typeof res.body.message, "string");
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});