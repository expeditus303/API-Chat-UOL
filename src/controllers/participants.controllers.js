import participantsServices from "../services/participants.services.js";

async function create(req, res, next) {
  const { name } = req.body;

  try {
    await participantsServices.create({ name });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const participantsList = await participantsServices.getAll();

    return res.status(200).send(participantsList);
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  get,
};
