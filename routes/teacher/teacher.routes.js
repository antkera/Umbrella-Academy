const express = require("express");
const Course = require("../../models/Course.model");
const User = require("../../models/User.model");
const Enrolment = require("../../models/Enrolment.model");
const router = express.Router();
const { isLoggedIn } = require("../../middlewares/auth.middleware");

// GET "/teacher/" => renderiza la pagina principal del profesor

router.get("/", (req, res, next) => {
  res.render("teacher/home");
});

// GET "/teacher/courses" => renderiza la pagina courses del profesor

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
      allCourses.push(await Course.findById(enrol.courseId._id));
      res.render("student/courses", { allCourses });
    }
  } catch (error) {
    next(error);
  }
});

// GET "/teacher/courses/:id/enrollments"
router.get("/courses/:id/enrollments", async (req, res, next) => {
  try {
    const enrollments = await Enrolment.find({ courseId: req.params.id })
      .populate("userId courseId")
      .select({ userId: 1, roleInCourse: 1 });
    res.render("course/view-enrollments", { enrollments });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
