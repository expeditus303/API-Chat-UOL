import participantsServices from "../services/participants.services.js"

async function create(req, res, next){
    const { name } = req.body

    try {
        await participantsServices.create({name})

        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default {
    create
}

