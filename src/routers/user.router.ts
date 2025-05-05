import  {Router} from "express";
import { authLogin, authRegister, profile } from "../controllers/user.controller";
import { auth } from "../middleware/auth";

const router:Router = Router()

router.post('/register', authRegister)
router.post('/login',authLogin)
router.get('/profile',auth,profile)

export default router