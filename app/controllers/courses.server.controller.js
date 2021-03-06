const mongoose = require("mongoose");
const Course = mongoose.model("Course");
const Student = require("mongoose").model("Student");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}

exports.create = function (req, res) {
  const course = new Course();
  course.courseCode = req.body.courseCode;
  course.courseName = req.body.courseName;
  course.section = req.body.section;
  course.semester = req.body.semester;
  console.log(req.body);
  //
  //
  Student.findOne({ email: req.body.email }, (err, student) => {
    if (err) {
      return getErrorMessage(err);
    }
    //
    req.id = student._id;
    console.log("student._id", req.id);
  }).then(function () {
    course.students = req.id;
    console.log("req.student._id", req.id);

    course.save((err) => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(course);
      }
    });
  });
};

//
exports.list = function (req, res) {
  Course.find()
    .sort("-created")
    .exec((err, courses) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(courses);
      }
    });
};

exports.courseById = function (req, res, next, id) {
  Course.findById(id)
    .populate("owner", "firstName lastName studentNumber")
    .exec((err, course) => {
      if (err) return next(err);
      if (!course) return next(new Error("Failed to load course " + id));
      req.course = course;
      console.log("in courseById:", req.course);
      next();
    });
};

exports.studentsByCourse = async (req, res) => {
  let courseCode = req.body.courseCode;
  //console.log(courseCode);
  let student = await Course.find({ courseCode: courseCode })
    .sort("-courseName")
    .populate("student", "firstName lastName fullName");
  try {
    var studArray = [];
    //student.forEach(element => {
    //    studArray.push(element)
    //});
    for (let i = 0; i < student.length; i++) {
      studArray.push(student[i].student);
    }
    res.status(200).json(studArray);
  } catch (e) {}
};

exports.read = function (req, res) {
  res.status(200).json(req.course);
};

exports.update = function (req, res) {
  console.log("in update:", req.course);
  const course = req.course;
  course.courseCode = req.body.courseCode;
  course.courseName = req.body.courseName;
  course.semester = req.body.semester;
  course.section = req.body.section;
  course.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(course);
    }
  });
};

//
exports.delete = function (req, res) {
  const course = req.course;
  course.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(course);
    }
  });
};
