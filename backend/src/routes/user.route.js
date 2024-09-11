import { Router } from "express"
import { loginUser, logoutUser, registerUser, verifyOTP, resendOTP } from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import validate from "../middleware/validate.middleware.js"
import { loginSchema, registerSchema } from "../validations/user.validation.js"
const router = Router()

router.post("/register", validate(registerSchema), registerUser)

router.post("/login", validate(loginSchema), loginUser)

router.post("/logout", verifyJWT, logoutUser)

router.post("/verify-otp", verifyOTP)

router.post("/resend-otp", resendOTP)

// router.post("refresh-token", refreshAccessToken)

export default router;