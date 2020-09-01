const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required : true
  },
  avatar : {
    type : String , 
    default : 'https://res-console.cloudinary.com/pklevi/thumbnails/v1/image/upload/v1588299846/dzlyZGhueWp2cnBwZmVwdm9sdjI=/preview'
  }
});


const User = mongoose.model('Upload', userSchema, 'uploadimg');
module.exports = User;
