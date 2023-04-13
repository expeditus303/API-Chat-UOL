import db from "../config/database.connection.js";

function findByName({ name }) {
  return db.participantsCollection.findOne({ name });
}

function insertNew({ name }, date) {
    return db.participantsCollection.insertOne({ name , lastStatus: date})
}

export default {
    findByName,
    insertNew
}
