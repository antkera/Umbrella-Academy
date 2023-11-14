const express = require("express");
const router = express.Router();
const Course = require("../../models/Course.model");
const uploader = require("../../middlewares/cloudinary.middleware");

// GET "/course/:id/view" => renderiza la vista de cursos de admin
router.get("/:id/view", async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneCourse = await Course.findById(id).populate("contents");
    const content = oneCourse.contents;
    res.render("course/view", { oneCourse, content });
  } catch (error) {
    next(error);
  }
});

// GET "/course/add" => renderiza la vista de crear cursos
router.get("/add", (req, res, next) => {
  res.render("course/add-course");
});

router.post("/add", uploader.single("profilePic"), async (req, res, next) => {
  try {
    const { name, isHighlighted } = req.body;
    const profilePic = req.file ? req.file.path : "";
    const course = await Course.create({ name, isHighlighted, profilePic });
    console.log(course);
    res.redirect("/course/" + course._id + "/view");
  } catch (error) {
    next(error);
  }
});
// POST "/course/:id/edit" => obtiene los datos para actualizar el curso
router.post("/:id", uploader.single("profilePic"), async (req, res, next) => {
  try {
    const { name, isHighlighted } = req.body;
    const courseId = req.params.id;
    const profilePic = req.file ? req.file.path : "";
    const course =
      profilePic !== ""
        ? { name, profilePic, isHighlighted }
        : { name, isHighlighted };

    await Course.findByIdAndUpdate(courseId, course);
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
