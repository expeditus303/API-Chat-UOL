import dayjs from "dayjs"
import errors from "../errors/errors.js"
import participantsRepositories from "../repositories/participants.repositories.js"
import messagesRepositories from "../repositories/messages.repositories.js"

async function create({user, to, text, type}){

    const participantExists = await participantsRepositories.findByName({ name: user })

    if (!participantExists) throw errors.unprocessableContent("You are not a participant")

    const currentTime = dayjs(Date.now()).format("HH:mm:ss")

    const message = {
        from: user,
        to,
        text,
        type,
        time: currentTime
    }

    await messagesRepositories.createOne(message)
}

async function get(user, limit) {


    if(limit) return (await (messagesRepositories.getLimit(user, limit))).reverse()
    
    return await messagesRepositories.get(user)
}

export default { create, get }