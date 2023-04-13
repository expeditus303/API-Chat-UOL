import messagesServices from "../services/messages.services.js"

async function create(req, res, next) {
    const { user } = req.headers
    const { to, text, type } = req.body

    try {
        await messagesServices.create({user, to, text, type})

        res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default { create }
