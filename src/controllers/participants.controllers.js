import participantsServices from "../services/participants.services.js"

export async function createParticipant(req, res){
    const { name } = req.body

    try {
        participantsServices.create({name})

        res.status(200).send("jijijiji")
    } catch (err) {
        res.send(err)
    }
}

