import { Router } from "express";
import { deleteUser, userById, users } from "../controllers/user.controller";
import { auth } from "../middleware/auth";
import { getUserId } from "../cache/user.cache";

const router:Router = Router()

router.get('/users',auth,users)
router.get('/:id',auth,getUserId,userById)
router.delete('/:id',auth,deleteUser)

export default router