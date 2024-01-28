import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import Workspace from "./workspace.model.ts";

// Save ids
let testUserId: any = null;
let testWorkspaceId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent User", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        // Get user
        const userEmail = "test@example.com";
        let foundUser = await User.findOne({ email: userEmail });
        if (!foundUser) {
            // Create user
            foundUser = new User({ email: userEmail });
            await foundUser.save();
        }
        // Save user id
        testUserId = foundUser._id;
        dataNew = {
            user: testUserId,
            name: "New Workspace",
            description: "Description of the new workspace.",
        };
        assertEquals(dataNew?.user, testUserId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new workspace", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new Workspace(dataNew);
        await record.save();
        // Save workspace id
        testWorkspaceId = record?._id;

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.name, dataNew?.name);
        assertEquals(record?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("List existing workspaces by user", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Workspace.find({ user: testUserId.toString() });
        assertEquals(found[0].user, dataNew?.user);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing workspace", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Workspace.findOne(testWorkspaceId);
        assertEquals(found?.user, dataNew?.user);
        assertEquals(found?.name, dataNew?.name);
        assertEquals(found?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing workspace", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Workspace.findOne(testWorkspaceId);
        const nameUpdated = "Updated Workspace";
        if (found) {
            found.name = nameUpdated;
            await found.save();
        }

        const updated = await Workspace.findOne({ name: nameUpdated });
        assertEquals(updated?.name, nameUpdated);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing workspace", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await Workspace.findOne(testWorkspaceId);
        if (record) {
            await Workspace.deleteOne({ _id: record._id });
        }

        const deleted = await Workspace.findOne(testWorkspaceId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all workspace collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        Workspace.deleteMany({});
        const deleted = await Workspace.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
