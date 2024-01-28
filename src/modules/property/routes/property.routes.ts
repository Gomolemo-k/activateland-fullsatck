import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
	list,
	listByWorkpsace,
	get,
	create,
	update,
	destroy,
	getPropertyReferences,
} from "../controllers/property.controller.ts";

const router = new Router();
const routePath = "/api/properties";

router.get(routePath, async (context) => { await list(context) });
router.get(`${routePath}/:id`, async (context) => { await get(context) });
router.post(routePath, async (context) => { await create(context) });
router.put(`${routePath}/:id`, async (context) => { await update(context) });
router.delete(`${routePath}/:id`, async (context) => { await destroy(context) });

router.get(`/api/properties-workspace/:workspaceId`, async (context) => { await listByWorkspace(context) });
router.get(`/api/property-references/:id`, async (context) => { await getPropertyReferences(context) });

export default router;