import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
	list,
	get,
	getByEmail,
	create,
	update,
	destroy,
} from "../controllers/user.controller.ts";

const router = new Router();
const routePath = "/api/users";

router.get(routePath, async (context) => { await list(context) });
router.get(`${routePath}/:id`, async (context) => { await get(context) });
router.post(routePath, async (context) => { await create(context) });
router.put(`${routePath}/:id`, async (context) => { await update(context) });
router.delete(`${routePath}/:id`, async (context) => { await destroy(context) });

router.get(`/api/user-email/:email`, async (context) => { await getByEmail(context) });

export default router;