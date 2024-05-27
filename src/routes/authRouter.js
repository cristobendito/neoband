import {Router} from "express";

import userApiController from "../controllers/users/userApiController.js";
import bandApiController from "../controllers/bands/bandApiController.js";

const router = Router();

router.post("/register", userApiController.register);
router.post("/login", userApiController.login);
router.post("/bandRegister", bandApiController.register);
router.post("/bandLogin", bandApiController.login);


export default router;
