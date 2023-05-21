import { Application, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import usersRoutes from '../modules/user/routes/user.routes.ts'
import projectsRoutes from '../modules/project/routes/project.routes.ts'
import userProfileRoutes from '../modules/user-profile/routes/user-profile.routes.ts'
import userAccountRoutes from '../modules/user-account/routes/user-account.routes.ts'
import teamRoutes from '../modules/team/routes/team.routes.ts'
import teamMemberRoutes from '../modules/team-member/routes/team-member.routes.ts'
import propertyRoutes from '../modules/property/routes/property.routes.ts'

const app = new Application();
// Configure CORS
app.use(oakCors());

// Add routes from diferent files
app.use(usersRoutes.routes());
app.use(usersRoutes.allowedMethods());

app.use(projectsRoutes.routes());
app.use(projectsRoutes.allowedMethods());

app.use(userProfileRoutes.routes());
app.use(userProfileRoutes.allowedMethods());

app.use(userAccountRoutes.routes());
app.use(userAccountRoutes.allowedMethods());

app.use(teamRoutes.routes());
app.use(teamRoutes.allowedMethods());

app.use(teamMemberRoutes.routes());
app.use(teamMemberRoutes.allowedMethods());

app.use(propertyRoutes.routes());
app.use(propertyRoutes.allowedMethods());

export default app;