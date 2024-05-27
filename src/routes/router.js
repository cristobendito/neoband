import {Router} from "express";

import userRouter from "./userRouter.js";
import bandRouter from "./bandRouter.js";
/* import commentRouter from "./commentRouter.js"; */
import authRouter from "./authRouter.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddlewares.js";


const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",isAdmin,userRouter);
router.use("/bands",isAuthenticated,bandRouter);

router.use("/",authRouter);
export default router;