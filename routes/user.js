import { Router } from "express"
import { getUser, updateUser, deleteUser } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router()


router.get('/',verifyToken,getUser)
router.patch('/',verifyToken,updateUser)
router.delete('/',verifyToken,deleteUser)

export default router