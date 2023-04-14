import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import handleAppErrors from "./middlewares/error.middleware.js";
import participantsRoutes from "./routes/participants.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import statusRoutes from "./routes/status.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use([participantsRoutes, messagesRoutes, statusRoutes]);

app.use(handleAppErrors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
