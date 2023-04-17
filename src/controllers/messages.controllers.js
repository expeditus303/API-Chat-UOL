import messagesServices from "../services/messages.services.js";

async function create(req, res, next) {
  const { user } = req.headers;
  const { to, text, type } = req.body;
  console.log(user)

  try {
    await messagesServices.create({ user, to, text, type });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  const { user } = req.headers;
  const limit = Number(req.query.limit);

  try {
    const messages = await messagesServices.get(user, limit);

    return res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
}

async function del(req, res, next) {
  const { user } = req.headers;
  const { messageId } = req.params;

  try {
    await messagesServices.del(user, messageId);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function edit(req, res, next) {
  const { user } = req.headers;
  const { text} = req.body;
  const { messageId } = req.params;

  try {
    await messagesServices.edit(user, text, messageId)

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
}

export default { create, get, del, edit };
