import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import UploadedFile from "./uploaded-file.model.ts";

//Save id
let testModelId: any = null;
// Data
let dataNew: any = {
    name: 'New File Name',
	type: 'png',
	url: 'http://test.com/img/first.png',  
};

Deno.test("Create a new UploadedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new UploadedFile(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.name, dataNew?.name);
        assertEquals(record?.type, dataNew?.type);
        assertEquals(record?.url, dataNew?.url);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing UploadedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UploadedFile.findOne(testModelId);
        assertEquals(found?.name, dataNew?.name);
        assertEquals(found?.type, dataNew?.type);
        assertEquals(found?.url, dataNew?.url);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing UploadedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UploadedFile.findOne(testModelId);
        const nameUpdated = "Updated"
        if (found) {
            found.name = nameUpdated;
            await found.save();
        }
    
        const updated = await UploadedFile.findOne({ name: nameUpdated });
        assertEquals(updated?.name, nameUpdated);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing UploadedFile", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await UploadedFile.findOne(testModelId);
        if (found) {
            await UploadedFile.deleteOne({ _id: found._id });
        }
    
        const deleted = await UploadedFile.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all UploadedFile collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        UploadedFile.deleteMany({});
        const deleted = await UploadedFile.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
