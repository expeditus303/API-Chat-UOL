function convertHeaderUTF8(req, res, next) {
  const { user } = req.headers;

  if (user) {
    const latin1Buffer = Buffer.from(user, "latin1");
    const utf8User = latin1Buffer.toString("utf8");
    req.headers.user = utf8User;
  }

  next();
}

export default convertHeaderUTF8;
