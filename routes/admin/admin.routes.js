const express = require("express");
const router = express.Router();
const Course = require("../../models/Course.model");
const User = require("../../models/User.model");
const moment = require("moment");
const Enrolment = require("../../models/Enrolment.model");



// GET "/admin" => renderiza la vista principal del admin
router.get("/", (req, res, next) => {
  res.render("admin/home");
});

// GET "/admin/courses" => renderiza la vista courses del admin

router.get("/courses", async (req, res, next) => {
  try {
    const allCourses = await Course.find();
    res.render("admin/courses", { allCourses });
  } catch (error) {
    next(error);
  }
});

// GET "/admin" => renderiza la vista principal del admin
router.get("/", (req, res, next) => {
  res.render("admin/home");
});

// GET "/admin/users" => renderiza la lista de usuarios con botones CRUD

router.get("/users", async (req, res, next) => {
  try {
    const arrUsers = await User.find();
    res.render("admin/users", { arrUsers });
  } catch (error) {
    next(error);
  }
});

// GET "/admin/users/:id/edit" => renderiza un formulario para editar el usuario por id.

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
      _id
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
      _id
    });
  } catch (error) {
    next(error);
  }
});

// POST "/admin/users/:id/edit" => recibe la id de un usuario para modificarlo

router.post("/users/:id/edit", async (req, res, next) => {

    const {firstName, lastName, phone, age, educativeLevel, role} = req.body
  await User.findByIdAndUpdate(req.params.id, {firstName, lastName, phone, age, educativeLevel, role})

  res.redirect(`/admin/users/${req.params.id}/details`);
});

// POST "/admin/:id/delete" => recibe la id de un usuario para borrarlo y redirige a la lista de users

router.post("/users/:id/delete", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/users");
  } catch (error) {
    next(error);
  }
});

// GET "/admin/users/:id/details" => renderiza los detalles de un sólo usuario.

router.get("/users/:id/details" , async(req, res, next) => {
  try {
    const {firstName, lastName, phone, age, educativeLevel, role, createdAt: createdAt , updatedAt: updatedAt, enrolments, email} = await User.findById(req.params.id)
    const fechaC =moment(createdAt).format("LLLL")
    const fechaU =moment(updatedAt).format("LLLL")
    res.render("admin/usersDetails", {firstName, lastName, phone, age, educativeLevel, role, fechaC, fechaU, enrolments, email})
  
  } catch (error) {
    next(error)
  }
})

// GET "/admin/enrollment/list" => renderiza la lista de enrollments que hay en la academia.

router.get("/enrollment/list",async (req, res, next) => {
  try {
    const enrollments = await Enrolment.find().populate("userId").populate("courseId")
    res.render("enrollment/list", {enrollments})
  } catch (error) {
    next(error)
  }
}) 


// GET "/admin/enrollment/create" => renderiza formulario para crear una matrícula

router.get("/enrollment/create" , async(req, res, next) => {

const users = await User.find().select({firstName: 1, lastName: 1, email: 1})
const courses = await Course.find().select({name: 1})



  res.render("enrollment/CRUD", {users, courses})
  
})

// POST "/admin/enrollment/create" => Crea una matricula y redirige a la lista de matriculas.

router.post("/enrollment/create" , async (req, res, next) => {
  let {userId, courseId, roleInCourse, status} = req.body
  if (!status){status = "active"}

  console.log({userId, courseId, roleInCourse, status});
  await Enrolment.create({userId, courseId, roleInCourse, status})
  console.log("supueestamente creado");
  res.redirect("/admin/enrollment/list")
})
module.exports = router;
