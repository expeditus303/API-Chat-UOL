function validationMiddleware(schema, field = "body") {
  return (req, res, next) => {
    const { error: errorMessages } = schema.validate(req[field], { abortEarly: false });
    if (errorMessages) {
        const errors = errorMessages.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
    next()
  };
}

export default validationMiddleware
