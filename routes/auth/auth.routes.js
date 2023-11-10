const express = require("express");
const capitalize = require("../../utils/capitalize");
const User = require("../../models/User.model");
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

router.post("/register" , async(req, res, next) => {
    const {firstName, lastName, phone, age, email, password, secondPassword} = req.body;
    if (password !== secondPassword){
        res.status(400).render("auth/register", {firstName, lastName, phone, age, email,
             erroMatchrPaswordMessage: "Both passwords must be the same."})
        
    return
}
    if (!firstName || !lastName || !email || !password) {
        res.status(400).render("auth/register", {firstName, lastName, phone, age, email,
             errorFullfillMessage: "The first three fields must be filled in"})
return
} 
const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(password)) {
      res.status(400).render("auth/register", {
        firstName, lastName, phone, age, email, 
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
    
    
    
    
    
    
    // try {
    //    await User.create({firstName, lastName, phone, age, email, password})
       
    // } catch (error) {
    //     next(error)
    // }

    // console.log(req.body);
    res.redirect("/")




    
        
    
})





module.exports = router
