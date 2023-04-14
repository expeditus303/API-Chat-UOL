import db from "../config/database.connection.js"

function findByName({ name }) {
    return db.participantsCollection.findOne({ name })
}

function update({ name, lastStatus }) {
    return db.participantsCollection.updateOne({ name }, {$set: {lastStatus}})
}

export default {
    findByName,
    update
}

// 1681422071503