import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import { TeamMember, teamMemberRole } from "./team-member.model.ts";

//Save ids
let testUserId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent TeamMember", async () => {
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
            role: teamMemberRole.NONE
        };
        assertEquals(dataNew?.user, testUserId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new TeamMember", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new TeamMember(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.role, dataNew?.role);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing TeamMember", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await TeamMember.findOne(testModelId);

        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.role, dataNew?.role);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing TeamMember", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await TeamMember.findOne(testModelId);
        const updated = teamMemberRole.ALL;
        if (found) {
            found.role = updated;
            await found.save();
        }
        const record = await TeamMember.findOne(testModelId);
        
        assertEquals(record?.user, dataNew?.user);
        assertEquals(record?.role, updated);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing TeamMember", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await TeamMember.findOne(testModelId);
        if (found) {
            await TeamMember.deleteOne({ _id: found._id });
        }
    
        const deleted = await TeamMember.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all TeamMember collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        TeamMember.deleteMany({});
        const deleted = await TeamMember.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
