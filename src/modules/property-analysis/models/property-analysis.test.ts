import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import Workspace from "../../workspace/models/workspace.model.ts";
import { Property, propertyType } from "../../property/models/property.model.ts";
import PropertyAnalysis from "./property-analysis.model.ts";

//Save ids
let testUserId: any = null;
let testWorkspaceId: any = null;
let testPropertyId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;

Deno.test("Get parent PropertyAnalysis", async () => {
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
        const workspacetName = "New Workspace";
        let foundWorkspace = await workspace.findOne({ user: foundUser._id, name: workspaceName });
        if (!foundWorkspace) {
            //Create Workspace
            foundWorkspace = new Workspace({ user: foundUser._id, name: workspaceName });
            await foundWorkspace.save();
        }
        //Get property
        const propertyTitle = "New Property";
        let foundProperty = await Property.findOne({ pworkspace: foundworkspace._id, name: propertyTitle });
        if (!foundProperty) {
            //Create Workspace
            foundProperty = new Property({ workspace: foundWorkspace._id, title: propertyTitle, propertyType: propertyType.HOUSE, bedrooms: 3, bathrooms: 2, size: 80 });
            await foundProperty.save();
        }
        //Save id
        testUserId = foundUser._id;
        testWorkspaceId = foundWorkspace._id;
        testPropertyId = foundProperty._id;

        //Save data
        dataNew = {
            property: testPropertyId,
            title: "New Property analysis",
            description: "New Property description.",
            rentalIncome: 765.35,
        };
        assertEquals(dataNew?.property, testPropertyId);
        await mongoose.disconnect();
    }
});

Deno.test("Create a new PropertyAnalysis", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new PropertyAnalysis(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.property, dataNew?.property);
        assertEquals(record?.title, dataNew?.title);
        assertEquals(record?.description, dataNew?.description);
        assertEquals(record?.rentalIncome, dataNew?.rentalIncome);
        await mongoose.disconnect();
    }
});

Deno.test("List existing PropertyAnalysis by Property", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await PropertyAnalysis.find({property: testPropertyId.toString()});
        // console.log('found: ', found);
        // console.log('testPropertyId: ', testPropertyId);
        // console.log('found[0].property: ', found[0].property);
        // assertEquals(found[0].property, testPropertyId);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing PropertyAnalysis", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await PropertyAnalysis.findOne(testModelId);

        assertEquals(record?.title, dataNew?.title);
        assertEquals(record?.description, dataNew?.description);
        assertEquals(record?.rentalIncome, dataNew?.rentalIncome);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing PropertyAnalysis", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await PropertyAnalysis.findOne(testModelId);
        const updated = 'Updated Property Analysis'
        if (found) {
            found.title = updated;
            await found.save();
        }
        const record = await PropertyAnalysis.findOne({ title: updated });
        
        assertEquals(record?.title, updated);
        assertEquals(record?.description, dataNew?.description);
        assertEquals(record?.rentalIncome, dataNew?.rentalIncome);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing PropertyAnalysis", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await PropertyAnalysis.findOne(testModelId);
        if (found) {
            await PropertyAnalysis.deleteOne({ _id: found._id });
        }
    
        const deleted = await PropertyAnalysis.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all PropertyAnalysis collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        PropertyAnalysis.deleteMany({});
        const deleted = await PropertyAnalysis.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
