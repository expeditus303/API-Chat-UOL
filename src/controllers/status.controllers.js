import statusServices from "../services/status.services.js"

async function update(req, res, next){
    const { user } = req.headers

    try {
        await statusServices.update(user)

        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

export default { update }