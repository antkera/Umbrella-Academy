const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    educativeLevel: {
      type: String,
      enum: ["1º ESO", "2º ESO", "3º ESO", "4º ESO", "Not asigned"],
      default: "",
    },
    profilePic: String,
    enrolments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Enrolment",
      },
    ],
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
