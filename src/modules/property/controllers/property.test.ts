import { assert, assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import app from "../../../api/api.routes.ts";
import { connectToDatabase } from "../../../database/db.ts";
import { User } from "../../user/models/user.model.ts";
import Project from "../../project/models/project.model.ts";

//Save ids
let testUserId: any = null;
let testProjectId: any = null;
let testModelId: any = null;
// Data
let dataNew: any = null;
// Path
const routePath = "/api/properties";

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

        //Get project
        const projectName = "New Project for Teams";
        let foundProject = await Project.findOne({ user: foundUser._id, name: projectName });
        if (!foundProject) {
            //Create Project
            foundProject = new Project({ user: foundUser._id, name: projectName });
            await foundProject.save();
        }
        
        //Save user id
        testUserId = foundUser?._id.toString();
        testProjectId = foundProject?._id.toString();

        //Create new data record
        dataNew = {
            project: testProjectId,
            title: "New Property",
            propertyType: 'LAND',
            bedrooms: 3,
            bathrooms: 2,
            size: 75,
            price: 135000,
            description: "New property in the beach.",
        };
        // console.log('dataNew: ', dataNew);

        assertEquals(dataNew?.project, testProjectId);
        // Disconnect services
        await mongoose.disconnect();
    }
});

Deno.test(`POST ${routePath}`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        
        try {
            const res = await request.post(routePath).send(dataNew);
            //console.log('res: ', res);
            //console.log('POST BODY: ', res.body);

            assertEquals(res.status, 201);
            assertEquals(res.body.project, testProjectId);
            assertEquals(res.body.title, dataNew.title);
            assertEquals(res.body.propertyType, dataNew.propertyType);
            assertEquals(res.body.bedrooms, dataNew.bedrooms);
            assertEquals(res.body.bathrooms, dataNew.bathrooms);
            assertEquals(res.body.size, dataNew.size);
            assertEquals(res.body.price, dataNew.price);
            assertEquals(res.body.description, dataNew.description);
        
            testModelId = res.body._id;
        } catch(error) {
            console.log('ERROR: ', error);
        }
        
        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`GET ${routePath}`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.get(routePath);
            //console.log('GET BODY: ', res.body);
        
            assertEquals(res.status, 200);
            assertEquals(typeof res.body[0]._id, "string");
            assertEquals(typeof res.body[0].title, "string");
            assertEquals(typeof res.body[0].bedrooms, "number");
        } catch(error) {
            console.log('ERROR: ', error)
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`GET ${routePath}/:id`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.get(`${routePath}/${testModelId}`);

            assertEquals(res.status, 200);
            assertEquals(typeof res.body._id, "string");
            assertEquals(typeof res.body.title, "string");
            assertEquals(typeof res.body.bedrooms, "number");
            assertEquals(res.body._id, testModelId);
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`PUT ${routePath}/:id`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);
        
        try {
            const dataUpdate = {
                title: "Updated Property",
                propertyType: "FARM",
                price: 180000,
            };
            
            const res = await request.put(`${routePath}/${testModelId}`).send(dataUpdate);
        
            assertEquals(res.status, 200);
            assertEquals(res.body._id, testModelId);
            assertEquals(res.body.title, dataUpdate.title);
            assertEquals(res.body.propertyType, dataUpdate.propertyType);
            assertEquals(res.body.bedrooms, dataNew.bedrooms);
            assertEquals(res.body.bathrooms, dataNew.bathrooms);
            assertEquals(res.body.size, dataNew.size);
            assertEquals(res.body.price, dataUpdate.price);
            assertEquals(res.body.description, dataNew.description);
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});

Deno.test(`DELETE ${routePath}/:id`, async () => {
    const mongoose = await connectToDatabase();
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
    if (mongoose && isConnected) {
        const request = await superoak(app);

        try {
            const res = await request.delete(`${routePath}/${testModelId}`);

            assertEquals(res.status, 200);
            assertEquals(typeof res.body.message, "string");
        } catch(error) {
            console.log('ERROR: ', error);
        }

        // Disconnect services
        request.delete;
        await mongoose.disconnect();
    }
});