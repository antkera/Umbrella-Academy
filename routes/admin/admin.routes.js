const express = require("express")
const User = require("../../models/User.model")
const router = express.Router()

// GET "admin/" => renderiza la vista principal del admin
router.get("/", (req, res, next) => {
    res.render("admin/home")
})


// GET "admin/courses" => renderiza la vista courses del admin

router.get("/courses",  (req, res, next) => {
    
    res.render("admin/courses")


})


// GET "admin/users" => renderiza la lista de usuarios con botones CRUD

router.get("/users", async(req, res, next) => {
    try {
        const arrUsers = await User.find();
        res.render("admin/users", {arrUsers})
        console.log({arrUsers: arrUsers})
    } catch (error) {
        next(error)
    }

    
})



// POST "admin/:id/edit/" => recibe la id de un usuario para modificarlo



// POST "admin/:id/delete/" => recibe la id de un usuario para borrarlo


module.exports = router
