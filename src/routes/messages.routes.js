import { Router } from "express";
import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware.js";
import schema from "../schemas/schemas.js";
import messagesControllers from "../controllers/messages.controllers.js";
import convertHeaderUTF8 from "../middlewares/convertHeaderUTF-8.middleware.js";

const messagesRoutes = Router();

messagesRoutes.post(
  "/messages",
  convertHeaderUTF8,
  schemaValidationMiddleware(schema.user, "headers"),
  schemaValidationMiddleware(schema.message),
  messagesControllers.create
);
messagesRoutes.get(
  "/messages",
  convertHeaderUTF8,
  schemaValidationMiddleware(schema.user, "headers"),
  schemaValidationMiddleware(schema.limit, "query"),
  messagesControllers.get
);
messagesRoutes.delete(
  "/messages/:messageId",
  convertHeaderUTF8,
  schemaValidationMiddleware(schema.user, "headers"),
  schemaValidationMiddleware(schema.params, "params"),
  messagesControllers.del
);
messagesRoutes.put(
  "/messages/:messageId",
  convertHeaderUTF8,
  schemaValidationMiddleware(schema.user, "headers"),
  schemaValidationMiddleware(schema.params, "params"),
  schemaValidationMiddleware(schema.message),
  messagesControllers.edit
);

export default messagesRoutes;
