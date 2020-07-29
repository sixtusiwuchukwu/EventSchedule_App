// this file rosolves all query and mutation operation which include:

// creating Event
// fetching Event
// updating Event
// DeletingSingle Event
// DeletingAll Event

const convert = require("../../helpers/date/index");

const EventQuery = {
  // code block below  handles fetching all events created as a query type

  getEvents: async (root, { _id }, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }

    return await Event.find({ creator: _id });
  },

  // <......fetching all created event codes ends .......>

  getDone: async (root, { _id }, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }
    return await Event.find({ done: true, creator: _id });
  },
  getImportant: async (root, { _id }, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }

    return await Event.find({ important: true, creator: _id });
  },
  getToday: async (root, { _id }, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }

    let founditem = await Event.find({ creator: _id });
    if (!founditem) throw new Error("event with this creator is not found");
    let arr = [];
    let getToday = new Date().toISOString().slice(0, 10).toString();

    founditem.forEach((element) => {
      let ch = element.date.toISOString().slice(0, 10);

      if (ch === getToday) arr.push(({ date, ...rest } = element));
    });

    return arr;
  },

  getSchedule: async (root, { _id }, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }

    let founditem = await Event.find({ creator: _id });
    if (!founditem) throw new Error("event with this creator is not found");
    let arr = [];
    let getToday = new Date().toISOString().slice(0, 10).toString();

    founditem.forEach((element) => {
      if (element.date !== getToday) arr.push(element);
    });
    return arr;
  },
};

// All operation below are of mutation type
const EventMutaion = {
  // this handles getting events created by the current user

  // this handles the creating of an  event to the database
  addEvent: async (
    root,
    { type, location, date, important, done, attendees, creator },
    { Event, req },
    info
  ) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }

    let existingEvent = await Event.findOne({
      type,
      location,
      date: new Date(date),
      important,
      done,
      attendees,
      creator,
    });

    if (existingEvent) throw new Error("found duplicate");

    const newEvent = await Event.create({
      type,
      location,
      date: new Date(date),
      important,
      done,
      attendees,
      creator,
    });
    return newEvent;

    // <.......creating Event codes ends ........>
  },

  // <....this  handles updating of event with the below parameters:first the _id this is used to locate the particular event to be updated when found then the value at the other values  will be updated to the found event.....>

  updateEvent: async (
    root,
    { _id, type, location, date, important, done, attendees },
    { Event, req },
    info
  ) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }

    let existingEvent = await Event.findOne({
      type,
      location,
      date: new Date(date),
      important,
      done,
      attendees,
    });

    // if (existingEvent._id !== _id) throw new Error("found duplicate");

    return await Event.findByIdAndUpdate(
      { _id },
      {
        $set: {
          type,
          location,
          date,
          important,
          done,
          attendees,
        },
      },
      { new: true }
    );

    // <.....updating of  Event codes ends........>
  },

  // <....this handles deleting of single event in the database by finding the event by its _id and delete when found....>
  deleteEvent: async (root, { _id }, { Event, req }, info) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }
    let founditem = await Event.findByIdAndRemove({ _id });
    if (!founditem) {
      throw new Error("no item found please check the input id");
    }
    return founditem;

    // <........ deleteSingle Events code ends.............>
  },

  // <.....this handles deleting of all event created in the database...>

  deleteEvents: async (root, args, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }
    return await Event.deleteMany();

    //< ...........deletingAll Events codes ends.........>
  },

  // checking if an Event is important if checked true check to false if false check to true

  important: async (root, { _id }, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }
    const founditem = await Event.findById({ _id });

    if (!founditem) {
      throw new Error("event not found");
    }
    if (!founditem.important) {
      await Event.findByIdAndUpdate(
        { _id },
        {
          important: true,
        },
        { new: true }
      );
    } else {
      await Event.findByIdAndUpdate(
        { _id },
        {
          important: false,
        },
        { new: true }
      );
    }
    return founditem;
  },

  // checking if an Event is done if checked true check to false if false check to true

  done: async (root, { _id }, { Event, req }) => {
    if (!req.isAuth) {
      throw new Error("unAuthorised");
    }

    const founditem = await Event.findById({ _id });

    if (!founditem) {
      throw new Error("event not found");
    }

    // if (event.creator.toString() !== req.userid) {
    //   throw new Error("access denied");
    // }
    if (!founditem.done) {
      await Event.findByIdAndUpdate(
        { _id },
        {
          done: true,
        },
        { new: true }
      );
    } else {
      await Event.findByIdAndUpdate(
        { _id },
        {
          done: false,
        },
        { new: true },
        (err, updated) => {
          if (err) {
            throw new Error("error occured");
          }
          return updated;
        }
      );
    }
    return founditem;
  },
};
module.exports = {
  EventMutaion,
  EventQuery,
};

// <...........Query and mutation Resolver code Ends.......>
