import httpStatus from "http-status";

function handleAppErrors(err, _req, res, _next) {
    let statusCode

    switch (err.name) {
        case "ConflictError":
            statusCode = httpStatus.CONFLICT
            break;
    
        default:
            statusCode = httpStatus.INTERNAL_SERVER_ERROR
            break;
    }

    let message = {message: err.message || "Internal Server Error"}

    return res.status(statusCode).send(message)
}

export default handleAppErrors