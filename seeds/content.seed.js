const mongoose = require("mongoose");
const Content = require("../models/Content.model");

const content = [
  {
    name: "Raiz cuadrada",
    description: "Introduccion a raices cuadradas de matemáticas de 1º ESO",
    contentType: "pdf",
    contentData: String,
    visibility: true,
    isHighlighted: false,
  },
  {
    name: "Potencias",
    description: "Introduccion a potencias de matemáticas de 2º ESO",
    contentType: "pdf",
    contentData: String,
    visibility: true,
    isHighlighted: false,
  },
  {
    name: "Polinomios",
    description: "Introduccion a polinomios de matemáticas de 3º ESO",
    contentType: "pdf",
    contentData: String,
    visibility: true,
    isHighlighted: false,
  },
  {
    name: "Trigonometría",
    description: "Introduccion a trigonometría de matemáticas de 4º ESO",
    contentType: "pdf",
    contentData: String,
    visibility: true,
    isHighlighted: false,
  },
];
const MONGO_URI = "mongodb://127.0.0.1:27017/Umbrella-academy";
const connection = async (next) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Estas conectado a la BD");
    await Content.insertMany(content);
    console.log("Añadidos todos los contenidos");
    await mongoose.disconnect();
    console.log("Cerrada la conexión a BD");
  } catch (error) {
    next(error);
  }
};
connection();
