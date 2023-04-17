function conflict(message = "Conflict") {
  return {
    name: "ConflictError",
    message,
  };
}

function unprocessableContent(message = "Unprocessable Content") {
  return {
    name: "UnprocessableContentError",
    message,
  };
}

function notFound(message = "Not Found") {
  return {
    name: "NotFoundError",
    message,
  };
}

function unauthorized(message = "Unauthorized") {
  return {
    name: "Unauthorized",
    message,
  };
}

export default {
  conflict,
  unprocessableContent,
  notFound,
  unauthorized,
};
