import db from "../config/database.connection.js";

function findByName({ name }) {
  return db.participantsCollection.findOne({ name });
}

function create(participant, message) {
    db.participantsCollection.insertOne(participant)
    db.messagesCollection.insertOne(message)
}

function getAll() {
  return db.participantsCollection.find().toArray()
}

export default {
    findByName,
    create,
    getAll
}
