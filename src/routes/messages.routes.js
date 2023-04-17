import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware.js";
import schema from "../schemas/schemas.js"
import messagesControllers from "../controllers/messages.controllers.js";

const messagesRoutes = Router()

messagesRoutes.post("/messages", schemaValidationMiddleware(schema.user, "headers", ), schemaValidationMiddleware(schema.message), messagesControllers.create)
messagesRoutes.get("/messages", schemaValidationMiddleware(schema.user, "headers"), schemaValidationMiddleware(schema.limit, "query"), messagesControllers.get)
messagesRoutes.delete("/messages/:messageId", schemaValidationMiddleware(schema.user, "headers"), schemaValidationMiddleware(schema.params, "params"), messagesControllers.del)
messagesRoutes.put("/messages/:messageId", schemaValidationMiddleware(schema.user, "headers"), schemaValidationMiddleware(schema.params, "params"), schemaValidationMiddleware(schema.message), messagesControllers.edit)

export default messagesRoutes