import { Router } from "express";
import { registerUser, login} from "../controllers/auth.js";

const router = Router();

router.post('/',registerUser)
router.post('/login',login)

export default router;