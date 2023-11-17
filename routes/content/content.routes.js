const Content = require("../../models/Content.model");
const express = require("express");
const router = express.Router();
const uploader = require("../../middlewares/cloudinary.middleware");
const Course = require("../../models/Course.model");

// GET "/content/add" => renderiza la vista de crear contenidos
router.get("/:id/add", (req, res, next) => {
  const courseId = req.params.id;
  res.render("content/add-content", { courseId });
});

router.post(
  "/:id/add",
  uploader.single("contentData"),
  async (req, res, next) => {
    try {
      const courseId = req.params.id;
      const { name, description, contentType, visibility, isHighlighted } =
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
      const course = await Course.findById(courseId).populate("contents");
      course.contents.push(content);
      await Course.findByIdAndUpdate(courseId, {
        contents: course.contents,
      });
      res.redirect("/content/" + content._id + "/view");
    } catch (error) {
      next(error);
    }
  }
);

// GET "/content/:id/view" => renderiza la vista de contents de un curso
router.get("/:id/view", async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneContent = await Content.findById(id);

    const course = await Course.findOne({ contents: oneContent }).select({
      _id: 1,
    });
    if (course) {
      res.render("content/view", { oneContent, course: course._id });
    } else {
      res.render("content/view", { oneContent });
    }
  } catch (error) {
    next(error);
  }
});

// GET "/content/:id/edit" => renderiza la vista principal de edicion de cursos de admin
router.get("/:id/edit", async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneContent = await Content.findById(id);
    res.render("content/edit-content", { oneContent });
  } catch (error) {
    next(error);
  }
});

// POST "/content/:id/edit" => renderiza la vista principal de edicion de cursos de admin
router.post(
  "/:id/edit",
  uploader.single("contentData"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const contentData = req.file ? req.file.path : "";
      const { name, description, contentType, visibility, isHighlighted } =
        req.body;
      const content =
        contentData !== ""
          ? {
              name,
              description,
              contentType,
              contentData,
              visibility,
              isHighlighted,
            }
          : { name, description, contentType, visibility, isHighlighted };

      await Content.findByIdAndUpdate(id, content);
      res.redirect("view");
    } catch (error) {
      next(error);
    }
  }
);

// POST "/content/:id/delete" => borra un contenido del curso y de la tabla de contenidos
router.post(
  "/:id/delete",
  uploader.single("contentData"),
  async (req, res, next) => {
    try {
      const courseId = "";
      const idContent = req.params.id;
      const content = await Content.findById(idContent).select({ _id: 1 });
      const course = await Course.findOneAndUpdate(
        { contents: content },
        { $pull: { contents: { $in: [content] } } }
      );
      await Content.findByIdAndDelete(idContent);
      console.log(uploader.single("contentData"));
      res.redirect("/course/" + course._id + "/view");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
