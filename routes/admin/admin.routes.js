const express = require("express");
const router = express.Router();
const Course = require("../../models/Course.model");
const User = require("../../models/User.model");

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

// GET "admin/" => renderiza la vista principal del admin
router.get("/", (req, res, next) => {
  res.render("admin/home");
});

// GET "admin/users" => renderiza la lista de usuarios con botones CRUD

router.get("/users", async (req, res, next) => {
  try {
    const arrUsers = await User.find();
    res.render("admin/users", { arrUsers });
  } catch (error) {
    next(error);
  }
});

// GET "admin/users/:id/edit/" => renderiza un formulario para editar el usuario por id.

router.get("/users/:id/edit", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      age,
      email,
      educativeLevel,
      enrolments,
      role,
    } = await User.findById(req.params.id);

    res.render("admin/usersCRUD", {
      firstName,
      lastName,
      phone,
      age,
      email,
      educativeLevel,
      enrolments,
      role,
    });
  } catch (error) {
    next(error);
  }
});

// POST "admin/users/:id/edit/" => recibe la id de un usuario para modificarlo

router.post("/users/:id/edit", async (req, res, next) => {
  // await User

  res.redirect("/users/:id/edit");
});

// POST "admin/:id/delete/" => recibe la id de un usuario para borrarlo y redirige a la lista de users

router.post("/users/:id/delete", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/users");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
