import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Untuk ESM module, dapatkan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        url: "https://api-todo-list-pbw.vercel.app",
      },
    ],
  },
  apis: [
    path.join(__dirname, "routes", "*.js"), // Gunakan path.join untuk resolving
    // Atau gunakan path absolut penuh
    // `/var/task/routes/*.js` (sesuaikan dengan struktur Vercel)
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Tambahkan "/docs"
};

export default swaggerDocs;
