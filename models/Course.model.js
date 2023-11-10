const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enrolments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Enrolment",
      },
    ],
    profilePic: String,
    contents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    isHighlighted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

module.exports = Course;
