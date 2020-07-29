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

\*Open endpoints require no Authentication.

\*signup user

```
    signupUser(username: String!, email: String!, password: String!): User

```

\*signinUser

```signinUser(email: String!, password: String!): User

```

```
mutation {
signupUser($username: String!, $email:String!,$password:$String!){

```

<!-- which will return the user details used in siginup as a result of sucess save to database -->
