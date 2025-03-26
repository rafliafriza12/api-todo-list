import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

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
        url: "http://localhost:5000", // Sesuaikan dengan base URL API
      },
    ],
  },
  apis: [path.resolve("routes/*.js")], // Pastikan sesuai dengan lokasi file route kamu
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
