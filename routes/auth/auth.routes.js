const express = require("express")
const router = express.Router()


// GET "auth/login" => Renderiza formulario para logearse.

router.get("/login", (req, res, next) => {
    res.render("auth/login");
} )


// POST "auth/login" => Envia el formulario para logearse y redirige a "/" o a login o a register



// GET "auth/regiter" => Renderiza el formulario para registrarse
router.get("/register", (req, res, next) => {
    res.render("auth/register");
} )



// POST "auth/regiter" => Envia el formulario a la base de datos y redirige a "/"





module.exports = router
