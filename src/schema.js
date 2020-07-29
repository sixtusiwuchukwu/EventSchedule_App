const { Query, Mutation } = require("./resolvers");
const typeDefs = require("./types");

const resolvers = {
  Query,
  Mutation,
};

module.exports = {
  typeDefs,
  resolvers,
};
