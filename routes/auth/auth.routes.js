const express = require("express");
const User = require("../../models/User.model");
const capitalize = require("../../utils/capitalize");
const router = express.Router();
const bcrypt = require("bcryptjs");

// GET "auth/login" => Renderiza formulario para logearse.

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// POST "auth/login" => Envia el formulario para logearse y redirige a "/" o a login o a register
router.post("/login", async (req, res, next) => {
  // Validación de campos

  // Campos vacios
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).render("auth/login", {
      errorMessage: "All the fields have to be filled",
      email,
    });
    return;
  }
  try {
    // Usuario en BD
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(404).render("auth/login", {
        errorMessage: "The user does not exist",
        email,
      });
      return;
    }
    // Password en BD
    const isValidPassword = bcrypt.compare(password, foundUser.password);
    if (!isValidPassword) {
      res.status(404).render("auth/login", {
        errorMessage: "Password is invalid",
        email,
      });
    }
    // Verificar formación de password
    /*const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(password)) {
      res.status(400).render("auth/login", {
        errorMessage:
          "Password is no secure enough. At least should have 8 caracters, one capital letter and one number",
      });
      return;
    }*/
    // Verificar formación de email
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!emailRegex.test(email)) {
      res.status(400).render("auth/login", {
        errorMessage: "Email is not valid. Please enter a valid email address",
      });
      return;
    }
    const sessionInfo = {
      _id: foundUser.id,
      username: foundUser.firstName + " " + foundUser.lastName,
    };

    req.session.user = sessionInfo;
    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
});

// GET "auth/regiter" => Renderiza el formulario para registrarse
router.get("/register", (req, res, next) => {
  res.render("auth/register");
});

// POST "auth/regiter" => Envia el formulario a la base de datos y redirige a "/"

router.post("/register", async (req, res, next) => {
  const { firstName, lastName, phone, age, email, password, secondPassword } =
    req.body;
  if (password !== secondPassword) {
    res
      .status(400)
      .render("auth/register", {
        firstName,
        lastName,
        phone,
        age,
        email,
        erroMatchrPaswordMessage: "Both passwords must be the same.",
      });

    return;
  }
  if (!firstName || !lastName || !email || !password) {
    res
      .status(400)
      .render("auth/register", {
        firstName,
        lastName,
        phone,
        age,
        email,
        errorFullfillMessage: "The first three fields must be filled in",
      });
    return;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (!passwordRegex.test(password)) {
    res.status(400).render("auth/register", {
      firstName,
      lastName,
      phone,
      age,
      email,
      errorPassRegexMessage:
        "Password is no secure enough. At least should have 8 caracters, one capital letter and one number",
    });
    return;
  }
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if(!emailRegex.test(email)) {
      res.status(400).render("auth/register", {
        firstName, lastName, phone, age, email, 
          errorMailRegexMessage:
          "Email is not valid. Please enter a valid email address"
      });
      return;
    }

    try {
       await User.create({firstName, lastName, phone, age, email, password})
       console.log("usuario creado")
    } catch (error) {
        next(error)
    }

  // console.log(req.body);
  res.redirect("/");
});

// GET "/auth/logout" => cerrar la sesión activa del usuario y redireccionarlo a "/"
router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    // despues de destruir la sesion que quieres hacer?
    res.redirect("/");
  });
});
    console.log(req.body);
    res.redirect("/")




    
        
    
})

module.exports = router;
