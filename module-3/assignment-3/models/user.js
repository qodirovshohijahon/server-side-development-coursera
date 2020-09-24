var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
  admin: {
    type: Boolean,
    default: false
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  }
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)