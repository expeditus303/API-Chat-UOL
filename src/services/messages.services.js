import dayjs from "dayjs"
import errors from "../errors/errors.js"
import participantsRepositories from "../repositories/participants.repositories.js"
import messagesRepositories from "../repositories/messages.repositories.js"
import { ObjectId } from "mongodb";

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
    const id = new ObjectId(messageId)
    const messageExists = await messagesRepositories.findById(_id)

    if(!messageExists) throw errors.notFound()

    const userOwnsMessage =  messageExists.from === user

    if(!userOwnsMessage) throw errors.unauthorized()

    return await messagesRepositories.del(user, id)
}

async function edit (user, text, messageId) {
    const id = new ObjectId(messageId)

    const messageExists = await messagesRepositories.findById(id)

    if(!messageExists) throw errors.notFound()

    const userOwnsMessage =  messageExists.from === user

    if(!userOwnsMessage) throw errors.unauthorized()

    return await messagesRepositories.edit(user, id, text)
}


export default { create, get, del, edit }