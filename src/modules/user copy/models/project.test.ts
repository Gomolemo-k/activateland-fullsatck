// import { assert, assertEquals, assertThrows } from "std/testing/asserts.ts";
// import Project from "./project.model.ts";
// import { connectToDatabase } from "../../../database/db.ts";

// Deno.test("Create a new project", async () => {
//     const mongoose = await connectToDatabase();
//     const isConnected = mongoose.connections[0].readyState === 1;
//     assert(isConnected, "Database is connected");
//     if (mongoose && isConnected) {
//         await User.findOneAndDelete({ email: "test@example.com" }).exec();
//         const user = new User({ email: "test@example.com", password: "password123" });
//         await user.save();
    
//         const foundUser = await User.findOne({ email: "test@example.com" });
//         assertEquals(foundUser?.email, "test@example.com");
//         await mongoose.disconnect();
//     }
// });

// Deno.test("Create a new user without password", async () => {
//     const mongoose = await connectToDatabase();
//     const isConnected = mongoose.connections[0].readyState === 1;
//     assert(isConnected, "Database is connected");
//     if (mongoose && isConnected) {
//         await User.findOneAndDelete({ email: "test@example.com" }).exec();
//         const user = new User({ email: "test@example.com" });
//         await user.save();
    
//         const foundUser = await User.findOne({ email: "test@example.com" });
//         assertEquals(foundUser?.email, "test@example.com");
//         await mongoose.disconnect();
//     }
// });

// Deno.test("Read an existing user", async () => {
//     const mongoose = await connectToDatabase();
//     const isConnected = mongoose.connections[0].readyState === 1;
//     assert(isConnected, "Database is connected");
//     if (mongoose && isConnected) {
//         const foundUser = await User.findOne({ email: "test@example.com" });
//         assertEquals(foundUser?.email, "test@example.com");
//         await mongoose.disconnect();
//     }
// });

// Deno.test("Update an existing user", async () => {
//     const mongoose = await connectToDatabase();
//     const isConnected = mongoose.connections[0].readyState === 1;
//     assert(isConnected, "Database is connected");
//     if (mongoose && isConnected) {
//         const user = await User.findOne({ email: "test@example.com" });
//         if (user) {
//             user.email = "new-email@example.com";
//             await user.save();
//         }
    
//         const updatedUser = await User.findOne({ email: "new-email@example.com" });
//         assertEquals(updatedUser?.email, "new-email@example.com");
//         await mongoose.disconnect();
//     }
// });

// Deno.test("Delete an existing user", async () => {
//     const mongoose = await connectToDatabase();
//     const isConnected = mongoose.connections[0].readyState === 1;
//     assert(isConnected, "Database is connected");
//     if (mongoose && isConnected) {
//         const user = await User.findOne({ email: "new-email@example.com" });
//         if (user) {
//             await User.deleteOne({ _id: user._id });
//         }
    
//         const deletedUser = await User.findOne({ email: "new-email@example.com" });
//         assertEquals(deletedUser, null);
//         await mongoose.disconnect();
//     }
// });

// Deno.test("Email should be unique", async () => {
//     const mongoose = await connectToDatabase();
//     const isConnected = mongoose.connections[0].readyState === 1;
//     assert(isConnected, "Database is connected");
//     if (mongoose && isConnected) {
//         const user = new User({ email: "test@example.com", password: "password123" });
//         await user.save();
//         const user2 = new User({ email: "test@example.com", password: "password" });
//         // This should throw an error because email has to be unique
//         try {
//             await user2.save();
//           } catch (error) {
//             assert(error);
//           }
//         await mongoose.disconnect();
//     }
// });

// Deno.test("Remove all User collection", async () => {
//     const mongoose = await connectToDatabase();
//     const isConnected = mongoose.connections[0].readyState === 1;
//     assert(isConnected, "Database is connected");
//     if (mongoose && isConnected) {
//         User.deleteMany({});
//         await mongoose.disconnect();
//     }
// });
