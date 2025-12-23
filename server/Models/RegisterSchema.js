const mongoose = require('mongoose');
const Schema1 = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please Enter correct Email Address!"
    ]
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters, include one uppercase letter and one number"
    ]
  }
});

module.exports = mongoose.model("Register", Schema1);