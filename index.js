const express = require("express");

const http = require("http");

const mongoose = require("mongoose");
// const cors = require("cors");

// cofiguring server to use .env file
require("dotenv").config({ path: "config.env" });

const { ApolloServer, PubSub } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./src/schema");
const User = require("./src/models/user/index");
const Event = require("./src/models/eventSchema/index");
const IsAuth = require("./src/middleware/authentication/index");

const Pubsub = new PubSub();
// initialize app
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,PATCH,UPDATE"
    );
    return res.status(200).json({});
  }
  next();
});

/*
conecting to database
*/

mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database is connected"))
  .catch((err) => {
    console.error("database is not connected", err);
  });

app.use(IsAuth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: () => console.log("websocket connected"),
    onDisconnect: () => console.log("websocket disconnected"),
  },
  context: ({ req, res }) => ({
    req,
    res,
    Event,
    User,
    Pubsub,
    engine: {
      reportSchema: true,
    },
  }),
  introspection: true,
  tracing: true,
});
// setting middleware

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

/*

initializing server port

*/

const PORT = process.env.PORT;
const mode = process.env.NODE_ENV === "production";
const BASE_URL = mode
  ? `https://eventschedule.herokuapp.com${server.graphqlPath}`
  : `http://localhost:${PORT}${server.graphqlPath}`;

console.log("production:", mode);

httpServer.listen({ port: PORT}, () =>
  console.log(`🚀 Server ready at ${BASE_URL}`)
);
console.log(
  `subcription is ready at localhost:${PORT}${server.subscriptionsPath}`
);
