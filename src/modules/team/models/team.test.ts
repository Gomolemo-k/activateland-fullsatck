import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import Project from "../../project/models/project.model.ts";
import Team from "./team.model.ts";

//Save ids
let testUserId: any = null;
let testProjectId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent Team", async () => {
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
        //Get project
        const projectName = "New Project for Teams";
        let foundProject = await Project.findOne({ user: foundUser._id, name: projectName });
        if (!foundProject) {
            //Create Project
            foundProject = new Project({ user: foundUser._id, name: projectName });
            await foundProject.save();
        }
        
        //Save id
        testUserId = foundUser._id;
        testProjectId = foundProject._id;

        //Save data
        dataNew = {
            project: testProjectId,
            name: "New Team",
            description: "Description of New Team.",
        };
        assertEquals(dataNew?.project, testProjectId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new Team", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new Team(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.project, dataNew?.project);
        assertEquals(record?.name, dataNew?.name);
        assertEquals(record?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing Team", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await Team.findOne(testModelId);

        assertEquals(record?.project, dataNew?.project);
        assertEquals(record?.name, dataNew?.name);
        assertEquals(record?.description, dataNew?.description)
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing Team", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Team.findOne(testModelId);
        const updated = 'Updated Team'
        if (found) {
            found.name = updated;
            await found.save();
        }
        const record = await Team.findOne({ name: updated });
        
        assertEquals(record?.project, dataNew?.project);
        assertEquals(record?.name, updated);
        assertEquals(record?.description, dataNew?.description)
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing Team", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Team.findOne(testModelId);
        if (found) {
            await Team.deleteOne({ _id: found._id });
        }
    
        const deleted = await Team.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all Team collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        Team.deleteMany({});
        const deleted = await Team.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
