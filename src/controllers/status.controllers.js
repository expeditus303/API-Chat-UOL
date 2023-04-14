import statusServices from "../services/status.services.js"

async function update(req, res){
    const { user } = req.headers

    try {
        await statusServices.update(user)

        res.sendStatus(200)
    } catch (err) {
        
    }
}

export default { update }