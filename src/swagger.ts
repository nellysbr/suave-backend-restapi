import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "Description of your API",
    },
  },
  apis: ["./src/**/*.ts"], // Path API files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
