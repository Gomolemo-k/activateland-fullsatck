import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
import { connectToDatabase } from "../../../database/db.ts";
import Location from "./location.model.ts";

//Save id
let testModelId: any = null;
// Data
let dataNew: any = {
    latitude: 41.0232021,
	longitude: -1.5489523,
	address: "Av./ Streetfaa 14 ESC. B, 1-5",
	city: "Barcelona",
	country: "Spain",
	postalCode: "E-25620",  
};

Deno.test("Create a new Location", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = new Location(dataNew);
        await record.save();
        //Save id
        testModelId = record?._id;

        assertEquals(record?.latitude, dataNew?.latitude);
        assertEquals(record?.longitude, dataNew?.longitude);
        assertEquals(record?.address, dataNew?.address);
        assertEquals(record?.city, dataNew?.city);
        assertEquals(record?.country, dataNew?.country);
        assertEquals(record?.postalCode, dataNew?.postalCode);
        await mongoose.disconnect();
    }
});

Deno.test("Read an existing Location", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const record = await Location.findOne(testModelId);

        assertEquals(record?.latitude, dataNew?.latitude);
        assertEquals(record?.longitude, dataNew?.longitude);
        assertEquals(record?.address, dataNew?.address);
        assertEquals(record?.city, dataNew?.city);
        assertEquals(record?.country, dataNew?.country);
        assertEquals(record?.postalCode, dataNew?.postalCode);
        await mongoose.disconnect();
    }
});

Deno.test("Update an existing Location", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Location.findOne(testModelId);
        const nameUpdated = "C./ Updated 23"
        if (found) {
            found.address = nameUpdated;
            await found.save();
        }    
        const record = await Location.findOne({ address: nameUpdated });

        assertEquals(record?.latitude, dataNew?.latitude);
        assertEquals(record?.longitude, dataNew?.longitude);
        assertEquals(record?.address, nameUpdated);
        assertEquals(record?.city, dataNew?.city);
        assertEquals(record?.country, dataNew?.country);
        assertEquals(record?.postalCode, dataNew?.postalCode);
        await mongoose.disconnect();
    }
});

Deno.test("Delete an existing Location", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const found = await Location.findOne(testModelId);
        if (found) {
            await Location.deleteOne({ _id: found._id });
        }
    
        const deleted = await Location.findOne(testModelId);
        assertEquals(deleted, null);
        await mongoose.disconnect();
    }
});

Deno.test("Remove all Location collection", async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        Location.deleteMany({});
        const deleted = await Location.find();
        assertEquals(Array.isArray(deleted), true);
        await mongoose.disconnect();
    }
});
