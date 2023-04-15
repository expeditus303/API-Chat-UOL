import { ObjectId } from "mongodb";
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

function findById(messageId) {
    // return db.messagesCollection.find( {$and: [{}]} )
    return db.messagesCollection.findOne({_id: new ObjectId(messageId)})
}

function findByIdAndUser(user, messageId) {
    return db.messagesCollection.findOne({$and: [{_id: new ObjectId(messageId)}, {from: user}]})
}

function deleteByIdAndUser(user, messageId) {
    return db.messagesCollection.findOneAndDelete({$and: [{_id: new ObjectId(messageId)}, {from: user}]})
}


export default {
    createOne,
    createMany, 
    get,
    getLimit,
    findById,
    findByIdAndUser,
    deleteByIdAndUser
}