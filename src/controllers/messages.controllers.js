import messagesServices from "../services/messages.services.js";

async function create(req, res, next) {
  const { user } = req.headers;
  const { to, text, type } = req.body;

  try {
    await messagesServices.create({ user, to, text, type });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  const { user } = req.headers;
  const { limit } = req.query;

  try {
    const messages = await messagesServices.get(user, limit);

    return res.status(200).send(messages);
  } catch (err) {}
}

export default { create, get };
