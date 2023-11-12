const express = require("express");
const router = express.Router();
const Course = require("../../models/Course.model");
// GET "admin/" => renderiza la vista principal del admin
router.get("/", (req, res, next) => {
  res.render("admin/home");
});

// GET "admin/courses" => renderiza la vista courses del admin

router.get("/courses", async (req, res, next) => {
  try {
    const allCourses = await Course.find();
    res.render("admin/courses", { allCourses });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
