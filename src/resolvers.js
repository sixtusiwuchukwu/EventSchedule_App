const { UserMutation } = require("./services/usersection/resolver");

const { EventMutaion, EventQuery } = require("./services/eventHandle/resolver");

const Mutation = {
  ...UserMutation,
  ...EventMutaion,
};
const Query = {
  ...EventQuery,
};

module.exports = {
  Mutation,
  Query,
};
