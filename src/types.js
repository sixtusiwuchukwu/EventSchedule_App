const { gql } = require("apollo-server-express");
const UserSchema = require("./services/usersection/types");
const EventSchema = require("./services/eventHandle/types");

// Types bootstrapper
const linkSchemas = gql`
  type Mutation {
    _: Boolean
  }

  type Query {
    _: Boolean
  }
`;

module.exports = [linkSchemas, UserSchema, EventSchema];
