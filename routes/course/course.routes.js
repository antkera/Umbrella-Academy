const express = require("express");
const router = express.Router();
const Course = require("../../models/Course.model");

// GET "/course/:id" => obtiene la ruta de la vista
router.get("/:id", (req, res, next) => {
  res.redirect("course/" + req.params.id + "/view");
});

// GET "/course/:id/view" => renderiza la vista de cursos de admin
router.get("/:id/view", async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneCourse = await Course.findById(id);
    res.render("course/view", { oneCourse });
  } catch (error) {
    next(error);
  }
});

// POST "/course/:id/edit" => obtiene los datos para actualizar el curso
router.post("/:id", async (req, res, next) => {
  try {
    const { name, profilePic, isHighlighted } = req.body;
    const courseId = req.params.id;
    await Course.findByIdAndUpdate(courseId, {
      name,
      profilePic,
      isHighlighted,
    });
    res.redirect("/course/" + courseId + "/view");
  } catch (error) {
    next(error);
  }
});
// GET "/course/:id/edit" => renderiza la vista principal de edicion de cursos de admin
router.get("/:id/edit", async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneCourse = await Course.findById(id);
    res.render("course/edit-course", { oneCourse });
  } catch (error) {
    next(error);
  }
});
// GET "/course/:id/delete" => Borra un curso
router.post("/:id/delete", async (req, res, next) => {
  try {
    const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId);
    res.redirect("/admin/courses");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
