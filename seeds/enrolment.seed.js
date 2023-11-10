const mongoose = require("mongoose");
const Enrolment = require("../models/Enrolment.model");
const User = require("../models/User.model");

const enrolment = [
  {
    userId: "654e26856004f9c7971bb936",
    courseId: "654e266e8704d3dfc7efa836",
    roleInCourse: "teacher",
    status: "active",
  },
  {
    userId: "654e26856004f9c7971bb935",
    courseId: "654e266e8704d3dfc7efa836",
    roleInCourse: "student",
    status: "active",
  },
  {
    userId: "654e26856004f9c7971bb934",
    courseId: "654e266e8704d3dfc7efa836",
    roleInCourse: "manager",
    status: "active",
  },
];
const MONGO_URI = "mongodb://127.0.0.1:27017/Umbrella-academy";
const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Estas conectado a la BD");
    const allEnrolments = await Enrolment.insertMany(enrolment);
    for (let i = 0; i < allEnrolments.length; i++) {
      //   User.findByIdAndUpdate(allEnrolments[i].userId, {
      //     enrolments: new ObjectId(allEnrolments[i]._id),
      //   });
      let user = User.findById(allEnrolments[i].userId);
      console.log(user.paths);
    }
    console.log("Añadidos todos los enrolments");
    await mongoose.disconnect();
    console.log("Cerrada la conexión a BD");
  } catch (error) {
    console.log(error);
  }
};
connection();
