// Dependencies
const mongoose = require('mongoose');

const connectMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongodb connected successfully")
  } catch(err) {
    console.log(err)
  }
}

module.exports = connectMongoDB;