import db from "../config/database.connection.js";

function createOne(message) {
  return db.messagesCollection.insertOne(message);
}

function createMany(messages) {
  return db.messagesCollection.insertMany(messages);
}

function get(user) {
  return db.messagesCollection
    .find({ $or: [{ to: "Todos" }, { to: user }, { from: user }] })
    .toArray();
}

function getLimit(user, limit) {
  return db.messagesCollection
    .find({ $or: [{ to: "Todos" }, { to: user }, { from: user }] })
    .sort({ time: -1 })
    .limit(limit)
    .toArray();
}

function findById(id) {
  return db.messagesCollection.findOne({ _id: id });
}

function del(user, id) {
  return db.messagesCollection.deleteOne({
    $and: [{ _id: id }, { from: user }],
  });
}

function edit(user, id, text) {
  return db.messagesCollection.updateOne(
    { $and: [{ _id: id }, { from: user }] },
    { $set: { text: text } }
  );
}

export default {
  createOne,
  createMany,
  get,
  getLimit,
  findById,
  del,
  edit,
};
