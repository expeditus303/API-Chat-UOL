import db from "../config/database.connection.js";

function create({name, formattedTime}){

    const message = {
        from: name,
        to: "Todos",
        text: 'entra na sala...',
        type: 'status',
        time: formattedTime
    }

    return db.messagesCollection.insertOne(message)
}

export default {
    create, 
}