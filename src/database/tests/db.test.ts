import { assert } from "../../../deps.ts";
import { connectToDatabase } from "../db.ts";

Deno.test("Database connection", async () => {
    const mongoose = await connectToDatabase();
    
    // Check if the database is connected
    const isConnected = mongoose.connections[0].readyState === 1;
    assert(isConnected, "Database is connected");
  
    // Clean up the test environment
    if (mongoose && isConnected) {
      await mongoose.disconnect();
    }
});