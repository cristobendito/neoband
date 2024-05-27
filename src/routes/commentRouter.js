import express from "express";
import commentApiController from "../controllers/comments/commentApiController.js";

const router = express.Router();

router.get("/", commentApiController.getAll);
router.get("/byproperty", commentApiController.getByProperty);
router.get("/:id", commentApiController.getById);
router.post("/", commentApiController.create);
router.put("/:id", commentApiController.update);
router.delete("/:id", commentApiController.remove);

export default router;