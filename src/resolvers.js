const {
  UserMutation,
  UserQuery,
  UserSubscription,
} = require("./services/usersection/resolver");

const { EventMutaion, EventQuery } = require("./services/eventHandle/resolver");

const Mutation = {
  ...UserMutation,
  ...EventMutaion,
};
const Query = {
  ...EventQuery,
  ...UserQuery,
};

const Subscription = {
  ...UserSubscription,
};

module.exports = {
  Mutation,
  Query,
  Subscription,
};
