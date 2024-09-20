import { Router } from "express";
import { getRelations, registerRelation, updateRelation } from "../controllers/relation.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// validations import
import {relationRegisterSchema, relationUpdateSchema} from "../validations/relation.validation.js"
import validate from "../middleware/validate.middleware.js";


const router = Router();

router.get("/", verifyJWT, getRelations);

router.post("/", verifyJWT,validate(relationRegisterSchema), registerRelation);

router.post("/", verifyJWT,validate(relationUpdateSchema), updateRelation);

export default router;