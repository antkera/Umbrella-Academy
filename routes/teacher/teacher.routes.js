const express = require("express");
const Course = require("../../models/Course.model");
const User = require("../../models/User.model");
const Enrolment = require("../../models/Enrolment.model");
const router = express.Router();

// GET "/teacher/" => renderiza la pagina principal del profesor

router.get("/", (req, res, next) => {
  res.render("teacher/home");
});

// GET "/teacher/courses" => renderiza la pagina courses del profesor

router.get("/courses", (req, res, next) => {
  res.render("teacher/courses");
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

//   try {
//     const { enrolments } = await Course.findById(req.params.id).populate(
//       "enrolments"
//     );
//     let users = [];
//     enrolments.forEach(async (enrollment) => {
//       users.push(await User.findById(enrollment.userId));
//     });
//     console.log(users);
//     res.render("course/view-enrollments", users);
//   } catch (error) {
//     next(error);
//   }
