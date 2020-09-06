const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const leaderSchema = new Schema({
  name:
  {
    type: String,
    required: true,
    unique: true
  },
  
  image:
  {
    type: String,
    require: true
  },
  
  designation:
  {
  type: String,
  default: 'Just Desig'
  },

  abbr:
  {
  type: String,
  required: true,
  },
  
  description:
  {
    type: String,
    required: true  
  }
})

var Leaders = mongoose.model('Leader', leaderSchema)

module.exports = Leaders