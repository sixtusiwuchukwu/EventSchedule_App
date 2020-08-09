const { gql } = require("apollo-server-express");

// initializing data structure
const userTypes = gql`
  extend type Mutation {
    # user section mutation type
    signupUser(username: String!, email: String!, password: String!): User

    signinUser(email: String!, password: String!): String!

    updateUser(
      id: ID!
      email: String!
      password: String!
      username: String!
    ): User
  }

  extend type Query {
    getUser: User
  }
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  extend type Subscription {
    newUser: User
  }
`;
module.exports = userTypes;
