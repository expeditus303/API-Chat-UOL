import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware.js";
import participantSchema from "../schemas/schemas.js"
import { createParticipant } from "../controllers/participants.controllers.js"

const participantsRoutes = Router()

participantsRoutes.post("/participants", validationMiddleware(participantSchema), createParticipant)

export default participantsRoutes