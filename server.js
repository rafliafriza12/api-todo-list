import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import authRouter from "./routes/authRouter.js";
import todoRouter from "./routes/todoRouter.js";
import swaggerDocs from "./document/swagger.js";

configDotenv();

const app = express();
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Koneksi ke MongoDB gagal:", error);
    process.exit(1);
  }
}

app.use("/auth", authRouter);
app.use("/todo", todoRouter);
swaggerDocs(app);

connectDB();

export default app; // Untuk Vercel
