import db from "../config/database.connection.js";

function findByName({ name }) {
  return db.participantsCollection.findOne({ name });
}

async function create(participant, message) {
  await db.participantsCollection.insertOne(participant);
  return await db.messagesCollection.insertOne(message);
}

function getAll() {
  return db.participantsCollection.find().toArray();
}

function findIdle(filter) {
  return db.participantsCollection.find(filter).toArray();
}

function deleteIdle(filter) {
  return db.participantsCollection.deleteMany(filter);
}

export default {
  findByName,
  create,
  getAll,
  findIdle,
  deleteIdle,
};
