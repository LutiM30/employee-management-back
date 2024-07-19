const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { connenct2DB } = require("./dbconnect");
require("dotenv").config();

const employeeSchema = require("./employees/employeeSchema");

const myResolver = require("./apiHandler");

const server = new ApolloServer({
  typeDefs: employeeSchema,
  resolvers: myResolver,
});

const app = express();
const enableCors = process.env.ENABLE_CORS;
const PORT = process.env.SERVER_PORT || 4000;

async function startServer() {
  await server.start();

  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });

  await connenct2DB();

  app.listen(PORT, () =>
    console.log(`server running on port http://localhost:${PORT}`)
  );
}

startServer();
