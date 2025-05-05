import  {Router} from "express";
import { login, register, profile, update } from "../controllers/auth.controller";
import { auth } from "../middleware/auth";

const router:Router = Router()

router.post('/register', register)
router.post('/login',login)
router.get('/profile',auth,profile)
router.put('/update',auth,update)

export default router