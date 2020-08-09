const { Query, Mutation, Subscription } = require("./resolvers");
const typeDefs = require("./types");

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

module.exports = {
  typeDefs,
  resolvers,
};
