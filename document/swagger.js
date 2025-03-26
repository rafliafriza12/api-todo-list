import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API Documentation",
      version: "1.0.0",
      description: "Dokumentasi API untuk Todo App",
    },
    servers: [
      {
        url: process.env.API_BASE_URL || "https://api-todo-list-pbw.vercel.app",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Pastikan path sesuai
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Gunakan "/docs"
};

export default swaggerDocs;
