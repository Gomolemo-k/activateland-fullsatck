import { mongoose } from "../../deps.ts";
import "https://deno.land/x/dotenv@v3.2.2/mod.ts";

export async function connectToDatabase() {
  try {
    //console.log("Database connection ENV: ", Deno.env.get("DENO_ENV"))
    const env = Deno.env.get("DENO_ENV") ?? "production";
    console.log("Database connection env: ", env)
    const isTesting = env === "test";
    // Localhost URL: 'mongodb://127.0.0.1:27017'
    // Localhost URL: 'mongodb://0.0.0.0:27017'
    // Localhost URL: 'mongodb://localhost:27017'
    // Localhost Docker Container: 'mongodb://mongodb:27017'
    const dbURI = isTesting
      ? 'mongodb://localhost:27017'
      : 'mongodb://localhost:27017'

    const dbName = isTesting
      ? 'test_db'
      : 'production_db'

    const dbUser = isTesting
      ? ''
      : ''

    const dbPassword = isTesting
      ? ''
      : ''

    await mongoose.connect(dbURI ?? "mongodb://localhost:27017"), 
      { bufferCommands: true, 
      dbName: dbName, 
      user: dbUser, 
      pass: dbPassword,
      autoIndex: true,
      autoCreate: true};

  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }

  return mongoose;
}
