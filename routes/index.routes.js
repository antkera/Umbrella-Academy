const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index"); //!meter midleware para redirigir a login si no hay una sesión activa
});

const { roleDefined } = require("../middlewares/auth.middleware");
const authRouter = require("./auth/auth.routes");
const adminRouter = require("./admin/admin.routes");
const studentRouter = require("./student/student.routes");
const teacherRouter = require("./teacher/teacher.routes");
const courseRouter = require("./course/course.routes");
const contentRouter = require("./content/content.routes");

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/course", roleDefined, courseRouter);
router.use("/content", contentRouter);

module.exports = router;
