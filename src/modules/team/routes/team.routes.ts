import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
	list,
	get,
	create,
	update,
	destroy,
	getTeamReferences,
} from "../controllers/team.controller.ts";

const router = new Router();
const routePath = "/api/teams";

router.get(routePath, async (context) => { await list(context) });
router.get(`${routePath}/:id`, async (context) => { await get(context) });
router.post(routePath, async (context) => { await create(context) });
router.put(`${routePath}/:id`, async (context) => { await update(context) });
router.delete(`${routePath}/:id`, async (context) => { await destroy(context) });

router.get(`/api/team-references/:id`, async (context) => { await getTeamReferences(context) });

export default router;