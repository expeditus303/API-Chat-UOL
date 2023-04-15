import db from "../config/database.connection.js";

function findByName({ name }) {
  return db.participantsCollection.findOne({ name });
}

async function create(participant, message) {
    await db.participantsCollection.insertOne(participant)
    await db.messagesCollection.insertOne(message)
}

function getAll() {
  return db.participantsCollection.find().toArray()
}

function findByStatus(query) {
  return db.participantsCollection.find(query).toArray()
}

export default {
    findByName,
    create,
    getAll,
    findByStatus
}
