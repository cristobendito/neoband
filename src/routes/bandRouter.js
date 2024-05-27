import {Router} from "express";

import bandApiController from "../controllers/bands/bandApiController.js";
import commentRouter from "../routes/commentRouter.js"

const router = Router();

router.get("/", bandApiController.getAll);
router.get("/byproperty", bandApiController.getByProperty);
router.get("/:id", bandApiController.getById);
router.post("/", bandApiController.create);
router.put("/:id", bandApiController.update);
router.delete("/:id", bandApiController.remove);
router.get("/:id", bandApiController.getById);
router.get("/:id/comments", bandApiController.getCommentsByBand);
router.use("/:id/comments", commentRouter);


export default router;
