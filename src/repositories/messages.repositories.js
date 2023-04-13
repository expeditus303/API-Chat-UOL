import db from "../config/database.connection.js";

function create(message){
    return db.messagesCollection.insertOne(message)
}

export default {
    create, 
}