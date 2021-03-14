var students = require("../controllers/students.server.controller");
var courses = require("../controllers/courses.server.controller");

module.exports = function (app) {
  app
    .route("/api/courses")
    .get(courses.list)
    .post(students.requiresLogin, courses.create);

  app
    .route("/api/courses/:courseId")
    .get(courses.read)
    .delete(students.requiresLogin, courses.delete);

  app.param("courseId", courses.courseById);
};
