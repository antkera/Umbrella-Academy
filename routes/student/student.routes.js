const express = require("express");
const getRouting = require("../../utils/functions");
const Course = require("../../models/Course.model");
const Enrolment = require("../../models/Enrolment.model");
const { isLoggedIn } = require("../../middlewares/auth.middleware");
const User = require("../../models/User.model");
const router = express.Router();

// GET "student/" => renderiza la pagina principal del estudiante
router.get("/", (req, res, next) => {
  res.render("student/home");
});

// GET "student/courses" => renderiza la pagina courses del estudiante
router.get("/courses", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    let allCourses = [];
    const userEnrolments = await User.findById(userId).populate("enrolments");
    if (userEnrolments.enrolments.length > 1) {
      userEnrolments.enrolments.forEach(async (eachEnrolment) => {
        let enrol = await Enrolment.findById(eachEnrolment._id).populate(
          "courseId"
        );
        allCourses.push(await Course.findById(enrol.courseId._id));
      });
      res.render("student/courses", { allCourses });
    } else {
      let enrol = await Enrolment.findById(userEnrolments.enrolments[0]._id);
      let course = await Course.findById(enrol.courseId._id);
      allCourses.push(course);
      res.render("student/courses", { allCourses });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
