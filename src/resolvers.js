const { UserMutation, UserQuery } = require("./services/usersection/resolver");

const { EventMutaion, EventQuery } = require("./services/eventHandle/resolver");

const Mutation = {
  ...UserMutation,
  ...EventMutaion,
};
const Query = {
  ...EventQuery,
  ...UserQuery,
};

module.exports = {
  Mutation,
  Query,
};
