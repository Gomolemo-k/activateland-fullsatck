import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import { UserAccount, userAccountType } from "./user-account.model.ts";

//Save ids
let testUserId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent UserAccount", async () => {
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
            type: userAccountType.BASIC,
            purchase: 49.95,
            expiresAt: Date.now(),
        };
        assertEquals(dataNew?.user, testUserId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new UserAccount", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new UserAccount(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.type, dataNew?.type);
        assertEquals(record?.purchase, dataNew?.purchase);
        assertEquals(record?.expiresAt, new Date(dataNew?.expiresAt));
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing UserAccount", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await UserAccount.findOne(testModelId);

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.type, dataNew?.type);
        assertEquals(record?.purchase, dataNew?.purchase);
        assertEquals(record?.expiresAt, new Date(dataNew?.expiresAt));
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing UserAccount", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UserAccount.findOne(testModelId);
        const updated = userAccountType.PRO
        if (found) {
            found.type = updated;
            await found.save();
        }
        const record = await UserAccount.findOne(testModelId);
        
        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.type, updated);
        assertEquals(record?.purchase, dataNew?.purchase);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing UserAccount", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UserAccount.findOne(testModelId);
        if (found) {
            await UserAccount.deleteOne({ _id: found._id });
        }
    
        const deleted = await UserAccount.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all UserAccount collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        UserAccount.deleteMany({});
        const deleted = await UserAccount.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
