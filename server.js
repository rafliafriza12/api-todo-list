import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import authRouter from "./routes/authRouter.js";
import todoRouter from "./routes/todoRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const __swaggerDistPath = path.join(
  __dirname,
  "node_modules",
  "swagger-ui-dist"
);

// import swaggerDocs from "./document/swagger.js";

const port = 5000;

const app = express();
configDotenv();
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API Documentation for Todo Application",
    },
    servers: [
      {
        url: "https://api-todo-list-pbw.vercel.app", // Sesuaikan dengan URL deploy
        description: "Production Server",
      },
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
  },
  apis: [
    "./routes/*.js", // Pastikan path benar
  ],
};

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Koneksi ke MongoDB gagal:", error);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  }
}

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

const swaggerSpec = swaggerJSDoc(options);

// Middleware Swagger
app.use(
  "/",
  express.static(__swaggerDistPath, { index: false }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(console.dir);
