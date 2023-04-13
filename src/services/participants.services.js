import partipantsRepositories from "../repositories/participants.repositories.js";
import messagesRepositores from "../repositories/messages.repositories.js"
import errors from "../errors/errors.js"
import dayjs from "dayjs";


async function create({ name }) {
    const participantExists = await partipantsRepositories.findByName({ name }) // sertá que nao precisa deletar o {}? 

    if (participantExists) {
        throw errors.conflictError("The name provided is already registered. Please choose a different name.")
    }
    const lastStatus = Date.now()
    const formattedTime = dayjs(lastStatus).format("HH:mm:ss")

    await partipantsRepositories.create({ name, lastStatus})
    await messagesRepositores.create({name, formattedTime})
}

export default { 
    create
}
