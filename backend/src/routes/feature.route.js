import { Router } from "express";
import { sendBirthdayWish, getDriveFile } from "../controllers/feature.controller.js"
import validate from "../middleware/validate.middleware.js"
import { WishSchema } from "../validations/feature.validation.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router();

// defined routes here
router.post("/wish", verifyJWT, validate(WishSchema), sendBirthdayWish)
router.get("/test", verifyJWT, getDriveFile)

export default router;