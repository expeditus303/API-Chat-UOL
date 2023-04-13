import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware.js";
import schema from "../schemas/schemas.js"
import participantsControllers from "../controllers/participants.controllers.js"

const participantsRoutes = Router()

participantsRoutes.post("/participants", schemaValidationMiddleware(schema.participant), participantsControllers.create)
participantsRoutes.get("/participants", participantsControllers.get)

export default participantsRoutes
