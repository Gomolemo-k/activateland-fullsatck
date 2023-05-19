import app from "./api.routes.ts";
import { connectToDatabase } from "../database/db.ts";
import "https://deno.land/x/dotenv@v3.2.2/mod.ts";
//import User from "../modules/user/models/user.model.ts";

const mongoose = await connectToDatabase();
// Check to see connection status.
console.log('Database is connected? ', mongoose.connections[0].readyState === 1);
//const users = await User.find();
//console.log('Users: ', users);
//console.log("API connection ENV: ", Deno.env.get('DENO_ENV'))
const env = Deno.env.get('DENO_ENV') ?? "production";
console.log("API connection env: ", env)
const isTesting = env === "test";

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const hostAPI = isTesting ? 'localhost' : 'localhost';
const portAPI = isTesting ? 3002 : 3001;
let appAPI = null;
try {
  appAPI = await app.listen({ hostname: hostAPI, port: portAPI });
  console.log(`API is listening on host: ${hostAPI} and port: ${portAPI}`);
}catch(error){
  console.log(`API cannot be listening on host: ${hostAPI} and port: ${portAPI}`);
  console.log(`OAK ERROR: ${error}`);
}

export default { app, appAPI, hostAPI, portAPI };