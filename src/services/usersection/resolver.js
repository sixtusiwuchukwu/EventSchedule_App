// this file rosolves all query and mutation operation which include:

// creating User
// Logining user
// updating User

const GenerateToken = require("../../helpers/generateToken/index");
const bcrypt = require("bcrypt");

const Hash = require("../../helpers/passwordHash/index");

console.log(Hash);
const UserMutation = {
  signupUser: async (root, { email, username, password }, { User }, info) => {
    const exitinguser = User.findOne({ email });

    if (exitinguser) {
      throw new Error(`user with ${email} already exist`);
    }

    const newuser = await User.create({ email, username, password });
    console.log(newuser);
    return newuser;
  },

  signinUser: async (root, { email, password }, { User }) => {
    const founduser = await User.findOne({ email: email });
    if (!founduser) {
      return "user not found";
    }
    // #registered: database stored value

    // checking if creator inputed password is equal to the reqistered password using bcrypt as a dependency

    const isvalidpassword = await bcrypt.compare(password, founduser.password);

    // // if author password is not equal to registered password throw an error to the author

    if (!isvalidpassword) {
      return "invalid password";
    }

    // after a sucessful checks return the user which is the author == currentAuthor that inputed values

    let Token = GenerateToken(founduser, process.env.SECRET, "1d");
    founduser.token = Token;
    return ({ token, ...rest } = founduser);
  },
  updateUser: async (
    root,
    { id, email, username, password },
    { User, req }
  ) => {
    if (!req.isAuth) {
      throw new Error("UNATHOURIZED");
    }

    const existingEvent = Event.findOne({ email, username, password });

    if (existingEvent._id !== id) throw new Error("duplicate found ");

    const founduser = await User.findByIdAndUpdate(
      id,
      {
        email,
        username,
        password: await Hash(password),
      },
      { new: true }
    );

    if (!founduser) {
      return "user not found";
    }
    return founduser;
  },
};

module.exports = {
  UserMutation,
};

// <...........Query and mutation Resolver code Ends.......>
