import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware.js";
import schema from "../schemas/schemas.js";
import httpStatus from "http-status";
import statusControllers from "../controllers/status.controllers.js";
import convertHeaderUTF8 from "../middlewares/convertHeaderUTF-8.middleware.js";

const statusRoutes = Router();

statusRoutes.post(
  "/status",
  convertHeaderUTF8,
  schemaValidationMiddleware(schema.user, "headers", httpStatus.NOT_FOUND),
  statusControllers.update
);

export default statusRoutes;
