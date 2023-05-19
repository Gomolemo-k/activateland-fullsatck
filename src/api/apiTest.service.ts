import app from "./api.routes.ts";
import { connectToDatabase } from "../database/db.ts";

const mongoose = await connectToDatabase();

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

const hostAPI = 'localhost';
const portAPI = 3002;
let appAPI = null;
try {
  appAPI = await app.listen({ hostname: hostAPI, port: portAPI });
  console.log(`API is listening on host: ${hostAPI} and port: ${portAPI}`);
}catch(error){
  console.log(`API cannot be listening on host: ${hostAPI} and port: ${portAPI}`);
  console.log(`OAK ERROR: ${error}`);
}

export default { app, appAPI, hostAPI, portAPI };