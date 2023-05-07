import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const env = Deno.env.get("DENO_ENV") ?? "production";
    const isTesting = env === "test";

    const dbURI = isTesting
      ? 'mongodb://127.0.0.1:27017'
      : Deno.env.get("DATABASE_URL")

    const dbName = isTesting
      ? 'test_db'
      : Deno.env.get("DATABASE_NAME")

    const dbUser = isTesting
      ? ''
      : Deno.env.get("DATABASE_USER")

    const dbPassword = isTesting
      ? ''
      : Deno.env.get("DATABASE_PASSWORD")

      await mongoose.connect(dbURI ?? "mongodb://127.0.0.1:27017"), 
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
