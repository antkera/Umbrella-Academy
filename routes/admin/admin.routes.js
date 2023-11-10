const express = require("express")
const router = express.Router()

// GET "admin/" => renderiza la vista principal del admin
router.get("/", (req, res, next) => {
    res.render("admin/home")
})


// GET "admin/courses" => renderiza la vista courses del admin

router.get("/courses", (req, res, next) => {
    res.render("admin/courses")
})




module.exports = router
