# Event Management Schedule App

If you cloned this App from github or gitlab

```
you have to first run  `npm install` in the root folder in the terminal to install nodemodule

```

```
second start the app by runing `npm start`

```

This is a documentary of how to get different endpoints in this App

`this endpoints was written by iwuchukwu sixtus`
https://twitter.com/sixtusiwuchukwu

https://web.facebook.com/sixtus.iwuchukwu.31

https://gitlab.com/learnfactory/intern-tracka/tracker-base/-/tree/master/sixtus/EventSchedule

`consumer using appoloClient or graphql playground sholud hit the server at this endpoint` (https://eventschedule.herokuapp.com/graphql )
The different endpoints includes:

### below are Open endpoints require no Authentication.

# signup user

```
    signupUser(username: String!, email: String!, password: String!): User

```

# signinUser

```
signinUser(email: String!, password: String!):String!

```

### signinUser(email: String!, password: String!): `User`

will return values below which you choose any value you need

```

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }


```

## below are closed endpoints that require Authentication.

`you have to set token to the header when sending any request`

# below fetches all events which will require user id

```

   getEvents(_id: ID!): [Event]

```

# get user `to get the loggedin user a token is required to authentica the user and return the user details`

```
type Query {
    getUser: User
  }

```

### getEvents(\_id: ID!):`[Event]`

will return array of object as a response values below show list of value that will be returned after a sucess which you can choose any value you need

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

# fetches all scheduled events which will require a valide user id

```
getSchedule(_id: ID): [Event]

```

# below fetches all done events of a user which will require the user id

```
 getDone(_id: ID!): [Event]

```

# below fetches all important events of a user which will require the user id

```
 getImportant(_id: ID!): [Event]

```

# below fetches all today events of a user which will require the user id

```
 getToday(_id: ID!): [Event]

```

# below modify an event made by a user. this will require a valid user id and will return an updated version of the event

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
      type: String
      location: String
      date: String
      important: Boolean
      done: Boolean
      attendees: [String]
      creator: ID!
    ): Event

```

# authenticated user can modify the `important` status of their event with provided \_id

```
  important(_id: ID!): Event

```

# authenticated user can delete Event

```
deleteEvent(_id: ID): Event

```

# authenticated user can delete all event created by the user

```
deleteEvents: Event

```

# authenticated user can modify the `done` status of their event with provided \_id

```
 done(_id: ID!): Event

```

if you are runing this app locally you have to create a .env file `config.env`

`copy and paste this in the config.env file`

```
DB_URI="mongodb://localhost:27017/Events"
PORT=2000
SECRET="oliuydtsgfujil;kl"

```
