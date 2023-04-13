import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware.js";
import participantSchema from "../schemas/schemas.js"
import participantsController from "../controllers/participants.controllers.js"

const participantsRoutes = Router()

participantsRoutes.post("/participants", schemaValidationMiddleware(participantSchema), participantsController.create)
participantsRoutes.get("/participants", participantsController.get)

export default participantsRoutes