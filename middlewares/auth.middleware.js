const isLoggedIn = (req, res, next) =>
  req.session.user === undefined ? res.redirect("/auth/login") : next();

const isAdmin = (req, res, next) =>
  req.session.user.role === "admin" ? next() : res.redirect("/auth/login");

const roleDefined = (req, res, next) => {
  if (req.session.user === undefined) {
    res.locals.isSessionActive = false;
  } else {
    res.locals.isSessionActive = true;
    res.locals.isAdminSession =
      req.session.user.role === "admin" ? true : false;
    res.locals.isTeacherSession =
      req.session.user.role === "teacher" ? true : false;
    res.locals.isStudentSession =
      req.session.user.role === "student" ? true : false;
  }
  next();
};
module.exports = { isLoggedIn, isAdmin, roleDefined };
