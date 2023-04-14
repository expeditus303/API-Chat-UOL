import httpStatus from "http-status";

function validationMiddleware(schema, field = "body", err = httpStatus.UNPROCESSABLE_ENTITY) {
  return (req, res, next) => {
    const { error: errorMessages } = schema.validate(req[field], { abortEarly: false });
    if (errorMessages) {
        const errors = errorMessages.details.map((detail) => detail.message)
        return res.status(err).send(errors)
    }
    next()
  };
}

export default validationMiddleware
