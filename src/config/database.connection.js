import { MongoClient } from "mongodb";
import "dotenv/config";

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
  console.log("Connected to database");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db();
const participantsCollection = db.collection("participants");
const messagesCollection = db.collection("messages");

export default { participantsCollection, messagesCollection };
