import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
  apis: ["./routes/*.js"], // Pastikan path sesuai
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Gunakan "/docs"
};

export default swaggerDocs;
