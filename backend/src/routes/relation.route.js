import { Router } from "express";
import { getRelations, registerRelation } from "../controllers/relation.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// validations import
import {relationSchema} from "../validations/relation.validation.js"
import validate from "../middleware/validate.middleware.js";


const router = Router();

router.get("/", verifyJWT, getRelations);

router.post("/", verifyJWT,validate(relationSchema), registerRelation);

export default router;