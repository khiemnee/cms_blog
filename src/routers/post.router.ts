import { Router } from "express";
import { auth } from "../middleware/auth";
import { createPosts, deletePosts, getPostId, getPosts, updatePosts } from "../controllers/post.controller";
import { postIdCache, postsCache } from "../cache/post.cache";


const router:Router = Router()

router.get('/',auth,postsCache,getPosts)
router.post('/create',auth,createPosts)
router.delete('/delete/:id',auth,deletePosts)
router.put('/update/:id',auth,updatePosts)
router.get('/:id',auth,postIdCache,getPostId)

export default router