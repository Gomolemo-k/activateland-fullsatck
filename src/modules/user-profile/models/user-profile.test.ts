import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import UserProfile from "./user-profile.model.ts";

//Save ids
let testUserId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent UserProfile", async () => {
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
            firstName: "Foo",
            lastName: "Baa Boo",
            bio: "Bio description.",
        };
        assertEquals(dataNew?.user, testUserId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new UserProfile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new UserProfile(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.firstName, dataNew?.firstName);
        assertEquals(record?.lastName, dataNew?.lastName);
        assertEquals(record?.bio, dataNew?.bio);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing UserProfile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await UserProfile.findOne(testModelId);

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.firstName, dataNew?.firstName);
        assertEquals(record?.lastName, dataNew?.lastName);
        assertEquals(record?.bio, dataNew?.bio);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing UserProfile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UserProfile.findOne(testModelId);
        const nameUpdated = "Updated Name"
        if (found) {
            found.firstName = nameUpdated;
            await found.save();
        }
        const record = await UserProfile.findOne({ firstName: nameUpdated });
        
        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.firstName, nameUpdated);
        assertEquals(record?.lastName, dataNew?.lastName);
        assertEquals(record?.bio, dataNew?.bio);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing UserProfile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await UserProfile.findOne(testModelId);
        if (record) {
            await UserProfile.deleteOne({ _id: record._id });
        }
    
        const deleted = await UserProfile.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all UserProfile collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        UserProfile.deleteMany({});
        const deleted = await UserProfile.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
