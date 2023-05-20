import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import UpdatedFile from "./updated-file.model.ts";

//Save id
let testModelId: any = null;
// Data
let dataNew: any = {
    name: 'New File Name',
	type: 'png',
	url: 'http://test.com/img/first.png',  
};

Deno.test("Create a new UpdatedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new UpdatedFile(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.name, dataNew?.name);
        assertEquals(record?.type, dataNew?.type);
        assertEquals(record?.url, dataNew?.url);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing UpdatedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UpdatedFile.findOne(testModelId);
        assertEquals(found?.name, dataNew?.name);
        assertEquals(found?.type, dataNew?.type);
        assertEquals(found?.url, dataNew?.url);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing UpdatedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UpdatedFile.findOne(testModelId);
        const nameUpdated = "Updated"
        if (found) {
            found.name = nameUpdated;
            await found.save();
        }
    
        const updated = await UpdatedFile.findOne({ name: nameUpdated });
        assertEquals(updated?.name, nameUpdated);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing UpdatedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UpdatedFile.findOne(testModelId);
        if (found) {
            await UpdatedFile.deleteOne({ _id: found._id });
        }
    
        const deleted = await UpdatedFile.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all UpdatedFile collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        UpdatedFile.deleteMany({});
        const deleted = await UpdatedFile.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
