import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { MongoClient } from "mongodb"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

const mongoClient = new MongoClient(DATABASE_URL)
let db;

mongoClient.connect()