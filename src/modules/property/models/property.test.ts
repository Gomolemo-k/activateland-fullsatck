import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import Workspace from "../../workspace/models/workspace.model.ts";
import { Property, propertyType } from "./property.model.ts";

//Save ids
let testUserId: any = null;
let testWorkspaceId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent Property", async () => {
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
        //Get workspace
        const workspaceName = "New Workspace";
        let foundWorkspace = await Workspace.findOne({ user: foundUser._id, name: WorkspaceName });
        if (!foundWorkspace) {
            //Create Workspace
            foundWorkspace = new Workspace({ user: foundUser._id, name: workspaceName });
            await foundWorkspace.save();
        }
        
        //Save id
        testUserId = foundUser._id;
        testWorkspaceId = foundWorkspace._id;

        //Save data
        dataNew = {
            workspace: testWorkspaced,
            title: "New Property",
            propertyType: propertyType.LAND,
            bedrooms: 3,
            bathrooms: 2,
            size: 75,
            price: 135000,
            description: "New Property description.",
        };
        assertEquals(dataNew?.workspace, testWorkspaceId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new Property", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new Property(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.workspace, dataNew?.workspace);
        assertEquals(record?.title, dataNew?.title);
        assertEquals(record?.propertyType, dataNew?.propertyType);
        assertEquals(record?.bedrooms, dataNew?.bedrooms);
        assertEquals(record?.bathrooms, dataNew?.bathrooms);
        assertEquals(record?.size, dataNew?.size);
        assertEquals(record?.price, dataNew?.price);
        assertEquals(record?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("List existing Property by Workspace", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Property.find({workspace: testWorkspaceId.toString()});
        assertEquals(found[0].workspace, dataNew?.workspace);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing Property", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await Property.findOne(testModelId);

        assertEquals(record?.workspace, dataNew?.workspace);
        assertEquals(record?.title, dataNew?.title);
        assertEquals(record?.propertyType, dataNew?.propertyType);
        assertEquals(record?.bedrooms, dataNew?.bedrooms);
        assertEquals(record?.bathrooms, dataNew?.bathrooms);
        assertEquals(record?.size, dataNew?.size);
        assertEquals(record?.price, dataNew?.price);
        assertEquals(record?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing Property", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Property.findOne(testModelId);
        const updated = 'Updated Property'
        if (found) {
            found.title = updated;
            await found.save();
        }
        const record = await Property.findOne(testModelId);
        
        assertEquals(record?.workspace, dataNew?.workspace);
        assertEquals(record?.title, updated);
        assertEquals(record?.propertyType, dataNew?.propertyType);
        assertEquals(record?.bedrooms, dataNew?.bedrooms);
        assertEquals(record?.bathrooms, dataNew?.bathrooms);
        assertEquals(record?.size, dataNew?.size);
        assertEquals(record?.price, dataNew?.price);
        assertEquals(record?.description, dataNew?.description);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing Property", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Property.findOne(testModelId);
        if (found) {
            await Property.deleteOne({ _id: found._id });
        }
    
        const deleted = await Property.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all Property collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        Property.deleteMany({});
        const deleted = await Property.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
