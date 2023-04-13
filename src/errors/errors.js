function conflictError(message = "Conflict") {
  return {
    name: "ConflictError",
    message,
  };
}

export default {
    conflictError
}
