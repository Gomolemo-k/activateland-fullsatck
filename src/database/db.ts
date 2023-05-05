import { mongoose } from "../../deps.ts";

export async function connectToDatabase() {
  try {
    const env = Deno.env.get("DENO_ENV") ?? "production";
    const isTesting = env === "test";

    const dbURI = isTesting
      ? Deno.env.get("MONGO_DB_TEST_URL")
      : Deno.env.get("MONGO_DB_URL");

      await mongoose.connect(dbURI ?? "mongodb://127.0.0.1:27017/development_db");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }

  return mongoose;
}
