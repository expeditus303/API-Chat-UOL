import participantsRepositories from "../repositories/participants.repositories.js";
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

    console.log("vamossss")
    console.log(message)

    return await participantsRepositories.create(participant, message)

}

async function getAll(){
    return participantsRepositories.getAll()
}

export default { 
    create,
    getAll
}
