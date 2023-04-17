import httpStatus from "http-status";
import sanitizeObjectValues from "../utilities/sanatizeData.js";

function validationMiddleware(
  schema,
  field = "body",
  err = httpStatus.UNPROCESSABLE_ENTITY
) {
  return (req, res, next) => {
    req[field] = sanitizeObjectValues(req[field]);
    const { error: errorMessages } = schema.validate(req[field], {
      abortEarly: false,
    });
    if (errorMessages) {
      const errors = errorMessages.details.map((detail) => detail.message);
      return res.status(err).send(errors);
    }
    next();
  };
}

export default validationMiddleware;
