import errors from "../errors/errors.js";
import statusRepositories from "../repositories/status.repositories.js";

async function update(user) {
  const participantExists = await statusRepositories.findByName({ name: user });

  if (!participantExists) throw errors.notFound("User not found");

  const lastStatus = Date.now();

  return await statusRepositories.update({ name: user, lastStatus });
}

export default {
  update,
};
