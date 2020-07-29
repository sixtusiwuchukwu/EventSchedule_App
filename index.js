const express = require("express");

const mongoose = require("mongoose");
// const cors = require("cors");

// cofiguring server to use .env file
require("dotenv").config({ path: "config.env" });

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./src/schema");
const User = require("./src/models/user/index");
const Event = require("./src/models/eventSchema/index");
const IsAuth = require("./src/middleware/authentication/index");

// initialize app
const app = express();

app.use(IsAuth);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
    Event,
    User,
    engine: {
      reportSchema: true,
    },
  }),
});
// setting middleware

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
server.applyMiddleware({ app });

// connect to database
console.log(process.env.DB_URI);
mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database is connected"))
  .catch((err) => {
    console.error("database is not connected", err);
  });

// initialize server port

app.listen({ port: process.env.PORT || 2000 }, () =>
  console.log(`🚀 Server ready at http://localhost:2000${server.graphqlPath}`)
);
