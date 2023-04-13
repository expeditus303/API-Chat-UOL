import db from "../config/database.connection.js";

function findByName({ name }) {
  return db.participantsCollection.findOne({ name });
}

function create({ name, lastStatus}) {
    return db.participantsCollection.insertOne({ name , lastStatus})
}

function getAll() {
  return db.participantsCollection.find().toArray()
}

export default {
    findByName,
    create,
    getAll
}
