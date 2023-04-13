import participantsRepositories from "../repositories/participants.repositories.js";
import messagesRepositores from "../repositories/messages.repositories.js"
import errors from "../errors/errors.js"
import dayjs from "dayjs";


async function create({ name }) {
    const participantExists = await participantsRepositories.findByName({ name })

    if (participantExists) {
        throw errors.conflict("The name provided is already registered. Please choose a different name.")
    }
    const lastStatus = Date.now()
    const formattedTime = dayjs(lastStatus).format("HH:mm:ss")

    const participant = { name, lastStatus}

    const message = {
        from: name,
        to: "Todos",
        text: 'entra na sala...',
        type: 'status',
        time: formattedTime
    }

    return await partipantsRepositories.create(participant, message)

}

async function getAll(){
    return partipantsRepositories.getAll()
}

export default { 
    create,
    getAll
}
