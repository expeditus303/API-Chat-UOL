import db from "../config/database.connection.js";

function create(message){
    return db.messagesCollection.insertOne(message)
}

function get(user){
    return db.messagesCollection.find( {$or: [{to: "Todos"}, {to: user}, {from: user}]} ).toArray()
}

function getLimit(user, limit){
    return db.messagesCollection.find( {$or: [{to: "Todos"}, {to: user}, {from: user}]} ).sort({time: -1}).limit(limit).toArray()
}

export default {
    create, 
    get,
    getLimit
}