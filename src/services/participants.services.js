import partipantsRepositories from "../repositories/participants.repositories.js";
import errors from "../errors/errors.js"


async function create({ name }) {
    const participantExists = await partipantsRepositories.findByName({ name }) // sertá que nao precisa deletar o {}? 

    if (participantExists) {
        throw errors.conflictError("The name provided is already registered. Please choose a different name.")
    }
    const lastStatus = Date.now()

    await partipantsRepositories.create({ name, lastStatus})
}

export default { 
    create
}
