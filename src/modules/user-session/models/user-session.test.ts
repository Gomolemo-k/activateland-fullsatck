import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import UserSession from "./user-session.model.ts";

//Save ids
let testUserId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent UserSession", async () => {
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
        //foundUser = await User.findOne({ email: userEmail });
        //Save user id
        testUserId = foundUser._id;
        dataNew = {
            user: testUserId,
            token: "15ser6g46ar4h1.arger4adfer.5a4d5ga5fg",
	        expiresAt: Date.now(), 
        };
        assertEquals(testUserId, testUserId);
        assertEquals(dataNew?.user, testUserId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new UserSession", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new UserSession(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.token, dataNew?.token);
        assertEquals(record?.expiresAt, new Date(dataNew?.expiresAt));
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing UserSession", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await UserSession.findOne(testModelId);

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.token, dataNew?.token);
        assertEquals(record?.expiresAt, new Date(dataNew?.expiresAt));
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing UserSession", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UserSession.findOne(testModelId);
        const tokenUpdated = "a6e35r46arf4h6af.6a74rg6hq4reg6ha.36a54sfdg3a"
        if (found) {
            found.token = tokenUpdated;
            await found.save();
        }
        const record = await UserSession.findOne({ token: tokenUpdated });
        
        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.token, tokenUpdated);
        assertEquals(record?.expiresAt, new Date(dataNew?.expiresAt));
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing UserSession", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const foundProject = await UserSession.findOne(testModelId);
        if (foundProject) {
            await UserSession.deleteOne({ _id: foundProject._id });
        }
    
        const deleted = await UserSession.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all UserSession collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        UserSession.deleteMany({});
        const deleted = await UserSession.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
