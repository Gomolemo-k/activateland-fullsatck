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
// Path
const routePath = "/api/user-profiles";

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
        console.log('foundUser._id: ', foundUser?._id.toString());
        //Save user id
        testUserId = foundUser?._id.toString();
        dataNew = {
            user: testUserId,
            firstName: "Foo",
            lastName: "Baa Boo",
            bio: "Bio description.",
        };
        assertEquals(testUserId, testUserId);
        assertEquals(dataNew?.user, testUserId);
        
        // Disconnect services
        await mongoose.disconnect();
    }
});

Deno.test(`POST ${routePath}`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        
        try {
            const res = await request.post(routePath).send(dataNew);
            //console.log('POST BODY: ', res.body);

            assertEquals(res.status, 201);
            assertEquals(res.body.user, testUserId);
            assertEquals(res.body.firstName, dataNew.firstName);
            assertEquals(res.body.lastName, dataNew.lastName);
            assertEquals(res.body.bio, dataNew.bio);
        
            testModelId = res.body._id;
        } catch(error) {
            console.log('ERROR: ', error);
        }
        
        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`GET ${routePath}`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.get(routePath);
            //console.log('GET BODY: ', res.body);
        
            assertEquals(res.status, 200);
            assertEquals(typeof res.body[0]._id, "string");
            assertEquals(typeof res.body[0].firstName, "string");
        } catch(error) {
            console.log('ERROR: ', error)
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`GET ${routePath}/:id`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.get(`${routePath}/${testModelId}`);

            assertEquals(res.status, 200);
            assertEquals(typeof res.body._id, "string");
            assertEquals(typeof res.body.firstName, "string");
            assertEquals(res.body._id, testModelId);
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`PUT ${routePath}/:id`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        
        try {
            const dataUpdate = {
                firstName: "Updated Name"
            };
            
            const res = await request.put(`${routePath}/${testModelId}`).send(dataUpdate);
        
            assertEquals(res.status, 200);
            assertEquals(res.body._id, testModelId);
            assertEquals(res.body.firstName, dataUpdate.firstName);
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`DELETE ${routePath}/:id`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.delete(`${routePath}/${testModelId}`);

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