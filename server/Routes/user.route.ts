
import express from "express"
import { loginUser, registerUser } from "../Controllers/user/auth.controller";
import { setAvatar,getNeUser } from "../Controllers/user/user.controller";
import { authCheck } from "../Middleware/authCheck";
import validate from "../Middleware/validateResource";
import { createUserSchema,loginSchema } from "../Schema/user.schema";

const router = express.Router();

router.post('/register', validate(createUserSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/ne-user', authCheck, getNeUser);
router.post("/set-avatar",authCheck,setAvatar);
module.exports = router;