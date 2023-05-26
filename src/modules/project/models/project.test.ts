import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import Project from "./project.model.ts";

//Save ids
let testUserId: any = null;
let testProjectId: any = null;
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
        //foundUser = await User.findOne({ email: userEmail });
        //Save user id
        testUserId = foundUser._id;
        dataNew = {
            user: testUserId,
            name: "New Project",
            description: "Description of the new project.",
        };
        assertEquals(dataNew?.user, testUserId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new project", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new Project(dataNew);
        await record.save();
        //Save project id
        testProjectId = record?._id;

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.name, dataNew?.name);
        assertEquals(record?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("List existing projects by user", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        // console.log('testUserId: ', testUserId.toString());
        const found = await Project.find({user: testUserId.toString()});
        // console.log('found: ', found);
        assertEquals(found[0].user, dataNew?.user);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing project", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Project.findOne(testProjectId);
        assertEquals(found?.user, dataNew?.user);
        assertEquals(found?.name, dataNew?.name);
        assertEquals(found?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing project", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Project.findOne(testProjectId);
        const nameUpdated = "Updated Project"
        if (found) {
            found.name = nameUpdated;
            await found.save();
        }
    
        const updated = await Project.findOne({ name: nameUpdated });
        assertEquals(updated?.name, nameUpdated);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing project", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await Project.findOne(testProjectId);
        if (record) {
            await Project.deleteOne({ _id: record._id });
        }
    
        const deleted = await Project.findOne(testProjectId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all project collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        Project.deleteMany({});
        const deleted = await Project.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
