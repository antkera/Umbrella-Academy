const express = require("express");
const router = express.Router();
const Course = require("../../models/Course.model");
const User = require("../../models/User.model");
const moment = require("moment");
const Enrolment = require("../../models/Enrolment.model");
const { isLoggedIn, isAdmin } = require("../../middlewares/auth.middleware");
// const getId = (objId) => {
//   return "objId".slice(-26, -2)
// }

// GET "/admin" => renderiza la vista principal del admin
router.get("/", (req, res, next) => {
  res.render("admin/home");
});

// GET "/admin/courses" => renderiza la vista courses del admin

router.get("/courses", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const allCourses = await Course.find();
    res.render("admin/courses", { allCourses });
  } catch (error) {
    next(error);
  }
});

// GET "/admin" => renderiza la vista principal del admin
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("admin/home");
});

// GET "/admin/users" => renderiza la lista de usuarios con botones CRUD

router.get("/users", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const arrUsers = await User.find();
    res.render("admin/users", { arrUsers });
  } catch (error) {
    next(error);
  }
});

// GET "/admin/users/:id/edit" => renderiza un formulario para editar el usuario por id.

router.get("/users/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {
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
      _id,
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
      _id,
    });
  } catch (error) {
    next(error);
  }
});

// POST "/admin/users/:id/edit" => recibe la id de un usuario para modificarlo

router.post("/users/:id/edit", isLoggedIn, isAdmin, async (req, res, next) => {
  const { firstName, lastName, phone, age, educativeLevel, role } = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    phone,
    age,
    educativeLevel,
    role,
  });

  res.redirect(`/admin/users/${req.params.id}/details`);
});

// POST "/admin/:id/delete" => recibe la id de un usuario para borrarlo y redirige a la lista de users

router.post(
  "/users/:id/delete",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.redirect("/admin/users");
    } catch (error) {
      next(error);
    }
  }
);

// GET "/admin/users/:id/details" => renderiza los detalles de un sólo usuario.

router.get(
  "/users/:id/details",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const { createdAt: createdAt, updatedAt: updatedAt } =
        await User.findById(req.params.id);
      const fechaC = moment(createdAt).format("LLLL");
      const fechaU = moment(updatedAt).format("LLLL");

      const userId = req.params.id;
      let courses = [];
      const user = await User.findById(userId).populate("enrolments");
      if (user.enrolments.length > 1) {
        user.enrolments.forEach(async (eachEnrolment) => {
          let enrol = await Enrolment.findById(eachEnrolment._id).populate(
            "courseId"
          );
          courses.push(await Course.findById(enrol.courseId._id));
        });
        res.render("admin/usersDetails", { user, courses, fechaC, fechaU });
      } else if (user.enrolments.length === 0) {
        res.render("admin/usersDetails", { user, courses, fechaC, fechaU });
      } else {
        let enrol = await Enrolment.findById(user.enrolments[0]._id).populate(
          "courseId"
        );

        courses.push(await Course.findById(enrol.courseId._id));
        res.render("admin/usersDetails", { user, courses, fechaC, fechaU });
      }
    } catch (error) {
      next(error);
    }
  }
);

// GET "/admin/enrollment/list" => renderiza la lista de enrollments que hay en la academia.

router.get("/enrollment/list", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const enrollments = await Enrolment.find().populate("userId courseId");
    res.render("enrollment/list", { enrollments });
  } catch (error) {
    next(error);
  }
});

// GET "/admin/enrollment/create" => renderiza formulario para crear una matrícula

router.get(
  "/enrollment/create",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const users = await User.find().select({
        firstName: 1,
        lastName: 1,
        email: 1,
      });
      const courses = await Course.find().select({ name: 1 });

      res.render("enrollment/CRUD", { users, courses });
    } catch (error) {
      next(error);
    }
  }
);

// POST "/admin/enrollment/create" => Crea una matricula y redirige a la lista de matriculas.

router.post(
  "/enrollment/create",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      let { userId, courseId, roleInCourse, status } = req.body;
      if (!status) {
        status = "active";
      }
      const newEnrollment = await Enrolment.create({
        userId,
        courseId,
        roleInCourse,
        status,
      });
      await Course.findByIdAndUpdate(courseId, {
        $push: { enrolments: newEnrollment._id },
      });
      await User.findByIdAndUpdate(userId, {
        $push: { enrolments: newEnrollment._id },
      });
      res.redirect("/admin/enrollment/list");
    } catch (error) {
      next(error);
    }
  }
);

// GET "/admin/enrollment/:id/edit" => Renderiza un formulario para editar.

router.get(
  "/enrollment/:id/edit",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const enrollment = await Enrolment.findById(req.params.id)
        .populate("userId")
        .populate("courseId");
      const users = await User.find().select({
        firstName: 1,
        lastName: 1,
        email: 1,
      });
      const courses = await Course.find().select({ name: 1 });

      const enroll = {
        enrolled: `${enrollment.userId.email}: ${enrollment.userId.lastName}, ${enrollment.userId.firstName}`,
        enrolledId: enrollment.userId._id,
        enrolledCourse: enrollment.courseId.name,
        enrolledCourseId: enrollment.courseId._id,
        role: enrollment.roleInCourse,
        _id: enrollment._id,
      };
      console.log(enrollment.courseId);

      res.render("enrollment/edit", { enroll, users, courses });
    } catch (error) {
      next(error);
    }
  }
);

// POST "/admin/enrollment/:id/edit" => Actualiza un enrollment y redirige a details.

router.post(
  "/enrollment/:id/edit",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      let { userId, courseId, roleInCourse, status } = req.body;
      if (!status) {
        status = "active";
      }
      const newEnrollment = await Enrolment.findByIdAndUpdate(req.params.id, {
        userId,
        courseId,
        roleInCourse,
        status,
      });
      await Course.findByIdAndUpdate(newEnrollment.courseId, {
        $pull: { enrolments: newEnrollment._id },
      });
      await Course.findByIdAndUpdate(courseId, {
        $push: { enrolments: newEnrollment._id },
      });
      await User.findByIdAndUpdate(newEnrollment.userId, {
        $pull: { enrolments: newEnrollment._id },
      });
      await User.findByIdAndUpdate(userId, {
        $push: { enrolments: newEnrollment._id },
      });
      res.redirect(`/admin/enrollment/${req.params.id}/details`);
    } catch (error) {
      next(error);
    }
  }
);

// GET "/admin/enrollment/:id/details"

router.get(
  "/enrollment/:id/details",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const enrollment = await Enrolment.findById(req.params.id)
        .populate("userId")
        .populate("courseId");
      res.render("enrollment/details", enrollment);
    } catch (error) {
      next(error);
    }
  }
);

// POST "/admin/enrollment/:id/delete"
router.post(
  "/enrollment/:id/delete",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const enrollmentDeleted = await Enrolment.findByIdAndDelete(
        req.params.id
      );
      await Course.findByIdAndUpdate(enrollmentDeleted.courseId, {
        $pull: { enrolments: enrollmentDeleted._id },
      });

      await User.findByIdAndUpdate(enrollmentDeleted.userId, {
        $pull: { enrolments: enrollmentDeleted._id },
      });
      if (req.session.user.role === "admin") {
        res.redirect("/enrollment/list");
      } else {
        res.redirect("/");
      }
    } catch (error) {
      next(error);
    }
  }
);

// GET "/admin/users/search" => renderiza la lista de Users con un criterio de busqueda

router.get("/users/search", isAdmin, async (req, res, next) => {
  try {
    const arrUsers = await User.find(req.query);
    console.log(arrUsers);
    res.render("admin/users", { arrUsers });
  } catch (error) {
    next(error);
  }
});

router.get("/enrolments/search", isAdmin, async (req, res, next) => {
  try {
    const enrollments = await Enrolment.find(req.query)
      .populate("userId")
      .populate("courseId");
    console.log(enrollments);
    res.render("enrollment/list", { enrollments });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
