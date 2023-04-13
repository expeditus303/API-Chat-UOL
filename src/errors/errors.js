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

export default {
  conflict,
  unprocessableContent,
};
