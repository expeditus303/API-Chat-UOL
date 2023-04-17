import db from "../config/database.connection.js";

function createOne(message){
    return db.messagesCollection.insertOne(message)
}

function createMany(messages) {
    return db.messagesCollection.insertMany(messages)
}

function get(user){
    return db.messagesCollection.find( {$or: [{to: "Todos"}, {to: user}, {from: user}]} ).toArray()
}

function getLimit(user, limit){
    return db.messagesCollection.find( {$or: [{to: "Todos"}, {to: user}, {from: user}]} ).sort({time: -1}).limit(limit).toArray()
}

function findById(_id) {
    return db.messagesCollection.findOne({_id})
}

function deleteByIdAndUser(user, _id) {
    return db.messagesCollection.findOneAndDelete({$and: [{_id}, {from: user}]})
}


export default {
    createOne,
    createMany, 
    get,
    getLimit,
    findById,
    deleteByIdAndUser
}