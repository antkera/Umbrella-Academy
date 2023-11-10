const mongoose = require("mongoose");
const Enrolment = require("../models/Enrolment.model");
const enrolment = [
  {
    userId: "654e0ec815b39de6ffe03f31",
    courseId: "654e140bb5597096158c1425",
    roleInCourse: "teacher",
    status: "active",
  },
  {
    userId: "654e0ec815b39de6ffe03f30",
    courseId: "654e140bb5597096158c1425",
    roleInCourse: "student",
    status: "active",
  },
  {
    userId: "654e0ec815b39de6ffe03f2f",
    courseId: "654e140bb5597096158c1425",
    roleInCourse: "manager",
    status: "active",
  },
];
const MONGO_URI = "mongodb://127.0.0.1:27017/Umbrella-academy";
const connection = async (next) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Estas conectado a la BD");
    await Enrolment.insertMany(enrolment);
    console.log("Añadidos todos los contenidos");
    await mongoose.disconnect();
    console.log("Cerrada la conexión a BD");
  } catch (error) {
    next(error);
  }
};
connection();
