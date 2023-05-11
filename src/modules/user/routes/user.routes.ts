import { Router } from "npm:express@4.18.2";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
  } from "../controllers/user.controller.ts";
  
  const router = Router();
  
  router.get("api/users", getUsers);
  
  router.get("api/users/:id", getUser);
  
  router.post("api/users", createUser);
  router.put("api/users/:id", updateUser);
  router.delete("api/users/:id", deleteUser);

export default router;