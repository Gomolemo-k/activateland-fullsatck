import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers/user.controller.ts";

const router = new Router();

router.get("/api/users", async (context) => { await getUsers(context) });
router.get("/api/users/:id", async (context) => { await getUser(context) });
router.post("/api/users", async (context) => { await createUser(context) });
router.put("/api/users/:id", async (context) => { await updateUser(context) });
router.delete("/api/users/:id", async (context) => { await deleteUser(context) });

export default router;