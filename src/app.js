import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

const mongoClient = new MongoClient(DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
  console.log("Data base is connected");
} catch (err) {
  console.log("Data base is not connected");
}

app.post("/participants", async (req, res) => {
  const { name } = req.body;
  res.send(name);

  try {
    await db.collection("participants").insertOne({
      name: name,
      lastStatus: Date.now(),
    });
    await db.collection("messages").insertOne({
      from: name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: "HH:MM:SS",
    });
  } catch (err) {}
});

app.get("/participants", async (req, res) => {
  try {
    const participants = await db.collection("participants").find().toArray();
    res.send(participants);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/messages", async (req, res) => {
    try {
      const messages = await db.collection("messages").find().toArray();
      res.send(messages);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  });
