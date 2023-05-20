import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
	createProject,
	deleteProject,
	getProject,
	getProjects,
	updateProject,
} from "../controllers/project.controller.ts";

const router = new Router();

router.get("/api/projects", async (context) => { await getProjects(context) });
router.get("/api/projects/:id", async (context) => { await getProject(context) });
router.post("/api/projects", async (context) => { await createProject(context) });
router.put("/api/projects/:id", async (context) => { await updateProject(context) });
router.delete("/api/projects/:id", async (context) => { await deleteProject(context) });

export default router;