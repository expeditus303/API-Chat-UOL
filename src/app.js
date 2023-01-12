import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import dayjs from 'dayjs'

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

  const userExists = await db.collection("participants").findOne({ name })
  
  if (userExists) return res.status(409).send('User already exists')

  var now = dayjs().format('HH:mm:ss')

  
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
      time: now
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(422)
  }
});

app.get("/participants", async (req, res) => {
  try {
    const participants = await db.collection("participants").find().toArray();
    res.send(participants);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/messages", (req, res) => {
  console.log(req.headers.user)
  res.send(req.body)
})

app.get("/messages", async (req, res) => {
  try {
    const messages = await db.collection("messages").find().toArray();
    res.send(messages);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
