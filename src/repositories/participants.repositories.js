import db from "../config/database.connection.js";

function findByName({ name }) {
  return db.participantsCollection.findOne({ name });
}

function create({ name, lastStatus}) {
    return db.participantsCollection.insertOne({ name , lastStatus})
}

export default {
    findByName,
    create
}
