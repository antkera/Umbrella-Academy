const express = require("express")
const router = express.Router()

// GET "/teacher/" => renderiza la pagina principal del profesor 

router.get("/", (req, res, next) => {
    res.render("teacher/home");
} )

// GET "/teacher/courses" => renderiza la pagina courses del profesor 

router.get("/courses", (req, res, next) => {
    res.render("teacher/courses");
} )







module.exports = router
