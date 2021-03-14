const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  courseCode: { type: string, required: true },
  courseName: { type: string, required: true },
  section: { type: string, required: true },
  semester: { type: number, required: true },
  students: [{ type: String, ref: "student" }],
});

mongoose.model("Course", CourseSchema);
