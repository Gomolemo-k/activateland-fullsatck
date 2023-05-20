import { Application, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import usersRoutes from '../modules/user/routes/user.routes.ts'
import projectsRoutes from '../modules/project/routes/project.routes.ts'

const app = new Application();
// Configure CORS
app.use(oakCors());

// Add routes from diferent files
app.use(usersRoutes.routes());
app.use(usersRoutes.allowedMethods());

app.use(projectsRoutes.routes());
app.use(projectsRoutes.allowedMethods());

export default app;