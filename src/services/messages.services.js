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

async function del(user, messageId) {
    const messageIdExists = await messagesRepositories.findById(messageId)

    if(!messageIdExists) throw errors.notFound()

    const userOwnsMessage = await messagesRepositories.findByIdAndUser(user, messageId)

    if(!userOwnsMessage) throw errors.unauthorized()

    return await messagesRepositories.deleteByIdAndUser(user, messageId)
}

export default { create, get, del }