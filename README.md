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

# below fetches all events by the logged in user \_id

```
   getEvents(_id: ID!): [Event]

```

# fetches all scheduled events based on the logged in user)

```
getSchedule(_id: ID): [Event]

```

# below fetches all done events of logged in user

```
 getDone(_id: ID!): [Event]
```

# logged in user can modify post with provided \_id

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

# logged in user can addEvent

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

# (logged in user can modify the `important` status of their event with provided \_id)

```
  important(_id: ID!): Event

```

<!-- which will return the user details used in siginup as a result of sucess save to database -->
