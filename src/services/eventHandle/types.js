const { gql } = require("apollo-server-express");

// initializing grapgql data types for
// mutation types and Quey types

// mutation types includes addevent,update event,delete single Event,delete All event, setting important to true or false, setting done to true or false

// while the Query Types includes
// getEvent,getdone ,getToday, getSchedule

const eventTypes = gql`
  extend type Mutation {
    addEvent(
      type: String
      location: String
      date: String
      important: Boolean
      done: Boolean
      attendees: Int
      creator: ID!
    ): Event

    updateEvent(
      _id: ID
      type: String
      location: String
      date: String
      important: Boolean
      done: Boolean
      attendees: Int
    ): Event

    deleteEvent(_id: ID): Event

    deleteEvents: Event

    important(_id: ID!): Event

    done(_id: ID!): Event
  }

  type Event {
    _id: ID
    type: String
    location: String
    date: String
    important: Boolean
    done: Boolean
    attendees: Int
    creator: ID
  }
  type important {
    _id: ID
  }
  type done {
    _id: ID
  }

  extend type Query {
    getEvents(_id: ID!): [Event]
    getDone(_id: ID!): [Event]
    getImportant(_id: ID!): [Event]
    getToday(_id: ID!): [Event]
    getSchedule(_id: ID): [Event]
  }
`;

module.exports = eventTypes;
