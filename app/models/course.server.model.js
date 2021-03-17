const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  section: { type: String, required: true },
  semester: { type: Number, required: true },
  students: [{ type: String, ref: "student" }],
});

mongoose.model("Course", CourseSchema);
