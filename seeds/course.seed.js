const mongoose = require("mongoose");
const Course = require("../models/Course.model");

const courses = [
  {
    name: "1º Matemáticas",
    enrolments: [],
    profilePic: String,
    contents: [],
    isHighlighted: false,
  },
  {
    name: "2º Matemáticas",
    enrolments: [],
    profilePic: String,
    contents: [],
    isHighlighted: false,
  },
  {
    name: "3º Matemáticas",
    enrolments: [],
    profilePic: String,
    contents: [],
    isHighlighted: false,
  },
  {
    name: "4º Matemáticas",
    enrolments: [],
    profilePic: String,
    contents: [],
    isHighlighted: false,
  },
];
const MONGO_URI = "mongodb://127.0.0.1:27017/Umbrella-academy";
const connection = async (next) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Estas conectado a la BD");
    await Course.insertMany(courses);
    console.log("Añadidos todos los cursos");
    await mongoose.disconnect();
    console.log("Cerrada la conexión a BD");
  } catch (error) {
    next(error);
  }
};


module.exports = connection