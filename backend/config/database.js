
  const mongoose = require('mongoose')
  const dotenv = require('dotenv')
  dotenv.config()

const connectDB = () => { mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('database connected successfully'))
  .catch(err => console.log(err))
}

module.exports = connectDB