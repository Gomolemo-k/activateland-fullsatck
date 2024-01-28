import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
	list,
	listByUser,
	get,
	create,
	update,
	destroy,
	getWorkspaceReferences // Assuming this is the corresponding controller function for workspace references
} from "../controllers/workspace.controller.ts";

const router = new Router();
const routePath = "/api/workspaces"; // Change route path to /api/workspaces

router.get(routePath, async (context) => { await list(context) });
router.get(`${routePath}/:id`, async (context) => { await get(context) });
router.post(routePath, async (context) => { await create(context) });
router.put(`${routePath}/:id`, async (context) => { await update(context) });
router.delete(`${routePath}/:id`, async (context) => { await destroy(context) });

router.get(`/api/workspaces-user/:userId`, async (context) => { await listByUser(context) });
router.get(`/api/workspace-references/:id`, async (context) => { await getWorkspaceReferences(context) });

export default router;
