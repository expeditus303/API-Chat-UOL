import cors from "cors";
import dayjs from "dayjs";
import dotenv from "dotenv";
import express from "express";
import joi from 'joi'
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const PORT = process.env.PORT;
const PORT = 5000;
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

setInterval(async () => {
  const idleParticipants = await db.collection("participants").find({ lastStatus: { $lt: new Date() - 10000 } }).toArray();
  idleParticipants.map((idleParticipant) => removeParticipant(idleParticipant));
}, 5000);

const removeParticipant = async (idleParticipant) => {
  let now = dayjs().format("HH:mm:ss");

  const removeMessage = {
    from: idleParticipant.name,
    to: "Todos",
    text: "sai da sala...",
    type: "status",
    time: now,
  };

  try {
    await db.collection("participants").deleteOne({ _id: idleParticipant._id });
    await db.collection("messages").insertOne(removeMessage);
  } catch (err) {}
};

app.get("/participants", async (req, res) => {
  try {
    const participants = await db.collection("participants").find().toArray();
    res.send(participants);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/messages", async (req, res) => {
  const user = req.headers.user;
  const limit = req.query.limit

  try {
    const allMessages = await db.collection("messages").find().toArray();

    const messages = allMessages.filter((a) => {
      if (a.from === user || a.to === user || a.to === "Todos") {
        return a;
      }
    });

    if (limit) {
      if (limit < 1 || isNaN(limit)) return res.sendStatus(422)

      const limitedMessages = messages.slice(Number(limit) * -1).reverse();
      return res.send(limitedMessages);
    }

    res.send(messages);
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Server Error");
  }
});

app.post("/participants", async (req, res) => {
  const { name } = req.body;
  console.log({name})

  const participantsSchema = joi.object({
    name: joi.string().required()
  })

  const validation = participantsSchema.validate({name})

  if(validation.error) return res.sendStatus(422)
  
  try {
    const userExists = await db.collection("participants").findOne({ name });
  
    if (userExists) return res.status(409).send("User already exists");
  
    let now = dayjs().format("HH:mm:ss");
    await db.collection("participants").insertOne({
      name: name,
      lastStatus: Date.now(),
    });
    await db.collection("messages").insertOne({
      from: name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: now,
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(422);
  }
});

app.post("/messages", async (req, res) => {
  const { user } = req.headers;
  const { to, text, type } = req.body;

  const messagesSchemas = joi.object({
    to: joi.string().required(),
    text: joi.string().required(),
    type: joi.string().valid('message','private_message').required()
  })

  const validation = messagesSchemas.validate({to, text, type})

  if(validation.error) return res.sendStatus(422)

  const userExists = await db
    .collection("participants")
    .findOne({ name: user });

  if (!userExists) return res.sendStatus(422);

  var now = dayjs().format("HH:mm:ss");

  try {
    await db.collection("messages").insertOne({
      from: user,
      to,
      text,
      type,
      time: now,
    });
  } catch (err) {}

  res.sendStatus(201);
});

app.post("/status", async (req, res) => {
  const user = req.headers.user;
  console.log(user);

  try {
    const userExists = await db
      .collection("participants")
      .findOne({ name: user });

    if (!userExists) return res.sendStatus(404);

    await db
      .collection("participants")
      .updateOne({ name: user }, { $set: { lastStatus: Date.now() } });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(422);
  }
});

app.put("/messages/:id", async (req, res) => {
  const {id} = req.params
  const {user} = req.headers
  const { to, text, type } = req.body
  console.log(text)

  const messagesSchemas = joi.object({
    to: joi.string().required(),
    text: joi.string().required(),
    type: joi.string().valid('message','private_message').required()
  })

  const validation = messagesSchemas.validate({to, text, type})

  if(validation.error) return res.sendStatus(422)

  try {
    const idExists = await db.collection("messages").findOne({ _id: ObjectId(id) })

    if (!idExists) return res.sendStatus(404)

    if (idExists.from != user) return res.sendStatus(401)

    await db.collection("messages").updateOne({ _id: ObjectId(id)}, {$set: {text}})

    res.send("ok")
  } catch (err) {

    console.log(err)

    return res.sendStatus(500)
}
})

app.delete("/messages/:id", async (req, res) => {
  const {id} = req.params
  const {user} = req.headers

  try {
    const idExists = await db.collection("messages").findOne({_id: ObjectId(id)})

    if(!idExists) return res.sendStatus(404)

    if (idExists.from != user) return res.sendStatus(401)

    await db.collection("messages").deleteOne({_id: ObjectId(id)})

    res.sendStatus(200)

  } catch(err) {
    res.send(err)
  }

  
})