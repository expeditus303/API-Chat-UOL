import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware.js";
import schema from "../schemas/schemas.js"
import messagesControllers from "../controllers/messages.controllers.js";

const messagesRoutes = Router()

messagesRoutes.post("/messages", schemaValidationMiddleware(schema.user, "headers"), schemaValidationMiddleware(schema.message), messagesControllers.create)

export default messagesRoutes