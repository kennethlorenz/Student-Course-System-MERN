var students = require("../../app/controllers/students.server.controller");

module.exports = function (app) {
  // handle a get request made to /students path
  // and list students when /students link is selected
  app.get("/students", students.requiresLogin, students.list); //go to http://localhost:3000/students to see the list

  //handle a post request made to root path
  app.post("/", students.create);

  //authenticate student
  app.post("/signin", students.authenticate);
  app.get("/signout", students.signout);
  app.get("/read_cookie", students.isSignedIn);

  //path to a protected page
  app.get("/welcome", students.welcome);
};
