import { Router } from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"

const router = Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

// router.post("refresh-token", refreshAccessToken)

export default router;