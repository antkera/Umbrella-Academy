const express = require("express");
const Course = require("../../models/Course.model");
const User = require("../../models/User.model");
const Enrolment = require("../../models/Enrolment.model");
const router = express.Router();
const uploader = require("../../middlewares/cloudinary.middleware");
const Content = require("../../models/Content.model");

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
      .populate("userId")
      .select({ userId: 1 });
    console.log(enrollments);
    res.render("course/view-enrollments", { enrollments });
  } catch (error) {
    next(error);
  }
});

// GET   "/teacher/content/create" => Renderiza un formulario para crear contenido.

router.get("/content/create", async (req, res, next) => {
  try {
    const arrCourses = await Course.find().select({ name: 1, _id: 1 });
    res.render("content/create", { arrCourses });
  } catch (error) {
    next(error);
  }
});

// POST "/teacher/content/create" => Crea un contenido a partir de un formulario.

router.post(
  "/content/create",
  uploader.single("contentData"),
  async (req, res, next) => {
    try {
      const { name, description, contentType, visibility, isHighlighted, _id } =
        req.body;
      const contentData = req.file ? req.file.path : "";
      const content = await Content.create({
        name,
        description,
        contentType,
        contentData,
        visibility,
        isHighlighted,
      });
      await Course.findByIdAndUpdate(_id, {
        $push: { contents: content._id },
      });

      res.redirect("/teacher/content/list");
    } catch (error) {
      next(error);
    }
  }
);

// POST "/teacher/content/addToCourse" => Añade contenido a un curso.

router.post("/content/addToCourse", async (req, res, next) => {
  try {
    const { idCourse, idContent } = req.body;


    await Course.findByIdAndUpdate(idCourse, {
      $push: { contents: idContent },
    });

    res.redirect("/teacher/content/list");
  } catch (error) {
    next(error);
  }
});

// GET "/teacher/content/list" => renderiza una lista de los contenidos.

router.get("/content/list", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.contentType) {
      query.contentType = req.query.contentType;
    }
    const arrContents = await Content.find(query);
    const arrCourses = await Course.find();
    res.render("content/list", {
      arrContents,
      lastQuery: req.query.name,
      arrCourses,
    });
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
