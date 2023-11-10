const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const cypherPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Could not hash password");
  }
};

const createSeeds = async () => {
  try {
    const users = [
      {
        firstName: "admin",
        lastName: "admin",
        phone: "",
        age: "",
        email: "admin@umbrellaAcademy.com",
        password: await cypherPassword("admin"),
        educativeLevel: "Not asigned",
        profilePic: String,
        enrolments: [],
        role: "admin",
      },
      {
        firstName: "alumno1",
        lastName: "Umbrella",
        phone: "665234543",
        age: "17",
        email: "alumno1@umbrellaAcademy.com",
        password: await cypherPassword("alumno1"),
        educativeLevel: "1º ESO",
        profilePic: String,
        enrolments: [],
        role: "student",
      },
      {
        firstName: "teacher1",
        lastName: "Umbrella",
        phone: "655234543",
        age: "33",
        email: "teacher1@umbrellaAcademy.com",
        password: await cypherPassword("teacher1"),
        educativeLevel: "Not asigned",
        profilePic: String,
        enrolments: [],
        role: "teacher",
      },
    ];
    const MONGO_URI = "mongodb://127.0.0.1:27017/Umbrella-academy";
    await mongoose.connect(MONGO_URI);
    console.log("Estas conectado a la BD");
    await User.insertMany(users);
    console.log("Añadidos todos los usuarios");
    await mongoose.disconnect();
    console.log("Cerrada la conexión a BD");
  } catch (error) {
    throw new Error(error);
  }
};

createSeeds();
