const mongoose = require("mongoose");

// initializing database data structure

const EventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      minlength: 4,
      require: true,
      trim: true,
    },

    location: {
      type: String,
      minlength: 4,
      trim: true,
      required: true,
    },

    date: {
      type: Date,
      trim: true,
      require: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
    done: {
      type: Boolean,
      default: false,
    },
    attendees: {
      type: [String],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
