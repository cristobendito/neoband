import { Router } from "express";
import bandApiController from "../controllers/bands/bandApiController.js";

const bandRouter = Router();

router.get("/", bandApiController.getAll);
router.get("/byproperty", bandApiController.getByProperty);
router.get("/:id", bandApiController.getById);
router.post("/", bandApiController.create);
router.put("/:id", bandApiController.update);
router.delete("/:id", bandApiController.remove);


export default bandRouter;
