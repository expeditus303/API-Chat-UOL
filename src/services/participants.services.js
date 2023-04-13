import partipantsRepositories from "../repositories/participants.repositories.js";


async function create({ name }) {
    const participantExists = await partipantsRepositories.findByName({ name }) // sertá que nao precisa deletar o {}? 

    if (participantExists) {
        return console.log("dá não, já existe")
    //     return res.status(409).send({
    //         error: 'User already exists',
    //         message: 'The name provided is already registered. Please choose a different name.'
    //       });
    } 
    
    await insertParticipant({ name }, Date.now())
    return res.status(201)
}

export default { 
    create,
}
