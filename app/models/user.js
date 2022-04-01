// Dependencies
const  mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}) 


UserSchema.pre('save', async function () {
  const user = this ;
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch(err) {
    console.log(err, "\n err in hashing password")
  }
})



module.exports = mongoose.model('User', UserSchema)