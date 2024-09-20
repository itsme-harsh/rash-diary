import { Router } from "express";
import { getPeople, getAllPeople, registerPeople, updatePeople, deletePeople } from "../controllers/people.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { peopleRegisterSchema } from "../validations/people.validation.js"

const router = Router()

// define routes here

router.get('/:relationId', verifyJWT, getPeople);

router.get("/", verifyJWT, getAllPeople)

router.post("/", verifyJWT, validate(peopleRegisterSchema), registerPeople)

router.put("/", verifyJWT, updatePeople)

// ids took inside the body
router.delete("/", verifyJWT, deletePeople)

export default router;

