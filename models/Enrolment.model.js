const { Schema, model } = require("mongoose");

const enrolmentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    roleInCourse: {
      type: String,
      enum: ["manager", "editingteacher", "student", "teacher"],
      default: "student",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Enrolment = model("Enrolment", enrolmentSchema);

module.exports = Enrolment;
