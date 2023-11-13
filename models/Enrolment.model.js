const { Schema, model } = require("mongoose");

const enrolmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
      type: Schema.Types.ObjectId,
        ref: "Course",
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
