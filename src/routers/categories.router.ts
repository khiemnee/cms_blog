import { Router } from "express";
import { auth } from "../middleware/auth";
import { createCategories, deleteCategories, getCategories, updateCategories } from "../controllers/categories.controller";
import { checkRole } from "../middleware/role";

const router:Router = Router()

router.get('/categories',auth,getCategories)
router.post('/categories',auth,checkRole,createCategories)
router.put('/:id',auth,checkRole,updateCategories)
router.delete('/:id',auth,checkRole,deleteCategories)

export default router