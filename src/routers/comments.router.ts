import { Router } from "express";
import { auth } from "../middleware/auth";
import { createComments, deleteComments, updateComments } from "../controllers/comments.controller";
 

const router:Router = Router()


router.post('/create/:postId',auth,createComments)
router.put('/update/:commentId/:postId/',auth,updateComments)
router.delete('/delete/:commentId/:postId/',auth,deleteComments)


export default router