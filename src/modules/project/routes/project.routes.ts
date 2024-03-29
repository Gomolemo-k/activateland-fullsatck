import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
	list,
	listByUser,
	get,
	create,
	update,
	destroy,
	getProjectReferences
} from "../controllers/project.controller.ts";

const router = new Router();
const routePath = "/api/projects";

router.get(routePath, async (context) => { await list(context) });
router.get(`${routePath}/:id`, async (context) => { await get(context) });
router.post(routePath, async (context) => { await create(context) });
router.put(`${routePath}/:id`, async (context) => { await update(context) });
router.delete(`${routePath}/:id`, async (context) => { await destroy(context) });

router.get(`/api/projects-user/:userId`, async (context) => { await listByUser(context) });
router.get(`/api/project-references/:id`, async (context) => { await getProjectReferences(context) });

export default router;