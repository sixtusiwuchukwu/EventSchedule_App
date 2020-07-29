# Event Management Schedule App

If you cloned this App from github or gitlab

```
you have to first run `npm install` in the root folder in the terminal to install nodemodule

```

```
second start the app by runing `npm start`

```

This is a documentary of how to get different endpoints in this App

The different endpoints includes:

- Open endpoints require no Authentication.

# signup user

```
    signupUser(username: String!, email: String!, password: String!): User

```

# signinUser

```
signinUser(email: String!, password: String!): User

```

# user type

```

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    token: String
  }


```

# below is an event type

```

  type Event {
    _id: ID
    type: String
    location: String
    date: String
    important: Boolean
    done: Boolean
    attendees: [String]
    creator: ID
  }


```

# below fetches all events which will require user id

```

   getEvents(_id: ID!): [Event]

```

# fetches all scheduled events which will require a valide user id

```
getSchedule(_id: ID): [Event]

```

# below fetches all done events of a user which will require the user id

```
 getDone(_id: ID!): [Event]

```

# below modify an event made by a user. this will require a valid user id and will return a updated version of the event

```

   updateEvent(
      _id: ID
      type: String
      location: String
      date: String
      important: Boolean
      done: Boolean
      attendees: [String]
    ): Event


```

# An event can be created using the following mutation below

```

addEvent(
      _id: ID
      type: String
      location: String
      date: String
      important: Boolean
      done: Boolean
      attendees: [String]
      creator: ID!
    ): Event

```

# logged in user can modify the `important` status of their event with provided \_id

```
  important(_id: ID!): Event

```

<!-- which will return the user details used in siginup as a result of sucess save to database -->
