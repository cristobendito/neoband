import {Router} from "express";

import userRouter from "./userRouter.js";
import bandRouter from "./bandRouter.js";
/* import commentRouter from "./commentRouter.js"; */
import authRouter from "./authRouter.js";


const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",userRouter);
router.use("/bands",bandRouter);
/* router.use("/bands/comments",commentRouter); */
router.use("/",authRouter);
export default router;