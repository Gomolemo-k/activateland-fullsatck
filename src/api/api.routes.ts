import { Application, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import usersRoutes from '../modules/user/routes/user.routes.ts'

const app = new Application();

// Add routes from diferent files
app.use(usersRoutes.routes());
app.use(usersRoutes.allowedMethods());

export default app;