import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware.js"
import schema from "../schemas/schemas.js"
import httpStatus from "http-status";
import statusControllers from "../controllers/status.controllers.js"

const statusRoutes = Router()

statusRoutes.put("/status", schemaValidationMiddleware(schema.user ,"headers", httpStatus.NOT_FOUND), statusControllers.update)

export default statusRoutes