import cors from "cors";
import "dotenv/config";
import express from "express";
import participantsRoutes from "./routes/participants.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use([participantsRoutes])

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))


