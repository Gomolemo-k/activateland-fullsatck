import { deno_testing_assets } from "../../../deps.ts";
import { connectToDatabase } from "../db.ts";

Deno.test("Database connection", async () => {
    const mongoose = await connectToDatabase();
  
    // Check if the database is connected
    deno_testing_assets.assert(mongoose.connection.readyState === 1, "Database is not connected");
  
    // Clean up the test environment
    if (mongoose && mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  });