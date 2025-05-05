import { Router } from "express";
import { deleteUser, userById, users } from "../controllers/user.controller";
import { auth } from "../middleware/auth";

const router:Router = Router()

router.get('/users',auth,users)
router.get('/:id',auth,userById)
router.delete('/:id',auth,deleteUser)

export default router