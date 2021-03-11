// Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
var StudentSchema = new Schema({
  firstName: { type: String, required: true },

  lastName: { type: String, required: true },

  email: {
    type: String,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: true,
  },

  studentNumber: {
    type: Number,
    // Set a unique 'student number' index
    unique: true,
    // Validate 'username' value existance
    required: "Student Number is required",
  },

  phoneNumber: { type: number, required: true },

  address: { type: String, required: true },

  city: { type: String, required: true },

  password: {
    type: String,
    // Validate the 'password' value length
    validate: [
      (password) => password && password.length > 6,
      "Password should be longer",
    ],
  },
  program: [{ type: String, ref: "course" }],
});

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Create an instance method for authenticating user
StudentSchema.methods.authenticate = function (password) {
  //compare the hashed password of the database
  //with the hashed version of the password the user enters
  return this.password === bcrypt.hashSync(password, saltRounds);
};

// Create the 'student' model out of the 'UserSchema'
mongoose.model("Student", StudentSchema);
