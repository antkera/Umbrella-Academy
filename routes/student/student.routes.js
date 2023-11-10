const express = require("express");
const getRouting = require("../../utils/functions");
const router = express.Router()
const render = (req, res, next, render, data) => {
    res.render(render, data);
}

// GET "student/" => renderiza la pagina principal del estudiante 
router.get("/", (req, res, next) => {
    res.render("student/home");
} )

// GET "student/courses" => renderiza la pagina courses del estudiante 
router.get("/courses", (req, res, next) => {
    res.render("student/courses");
} )







module.exports = router
