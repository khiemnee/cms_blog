import { Router } from "express";
import { auth } from "../middleware/auth";
import { createPosts, deletePosts, getPosts, updatePosts } from "../controllers/post.controller";


const router:Router = Router()

router.get('/',auth,getPosts)
router.post('/create',auth,createPosts)
router.delete('/delete/:id',auth,deletePosts)
router.put('/update/:id',auth,updatePosts)

export default router