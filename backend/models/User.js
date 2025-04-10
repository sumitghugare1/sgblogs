const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '', 
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

//user-sumit@123.com
//pass-sumit123