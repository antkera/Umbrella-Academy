const mongoose = require("mongoose");
const Enrolment = require("../models/Enrolment.model");
const User = require("../models/User.model");
const Course = require("../models/Course.model");

const enrolment = [
  {
    userId: "654e59ac7d146f59e946a437",
    courseId: "655107cfceeb012b46cdb4f0",
    roleInCourse: "editingteacher",
    status: "active",
  },
  {
    userId: "654e59ac7d146f59e946a436",
    courseId: "655107cfceeb012b46cdb4f0",
    roleInCourse: "student",
    status: "active",
  },
  {
    userId: "654e59ac7d146f59e946a435",
    courseId: "655107cfceeb012b46cdb4f0",
    roleInCourse: "manager",
    status: "active",
  },
];
const MONGO_URI = "mongodb://127.0.0.1:27017/Umbrella-academy";
const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Estas conectado a la BD");
    // Asignar los userId y courseId para las matriculaciones según los datos de la BD
    const allEnrolments = await Enrolment.insertMany(enrolment);
    for (const enrolment of allEnrolments) {
      let userId = enrolment.userId;
      let courseId = enrolment.courseId;
      let user = await User.findById(userId);
      let course = await Course.findById(courseId);
      await User.findByIdAndUpdate(user.id, {
        enrolments: enrolment,
      });
      await Course.findByIdAndUpdate(course.id, {
        enrolments: enrolment,
      });
    }
    console.log("Añadidos todos los enrolments");
    await mongoose.disconnect();
    console.log("Cerrada la conexión a BD");
  } catch (error) {
    console.log(error);
  }
};

connection();

module.exports = connection;
