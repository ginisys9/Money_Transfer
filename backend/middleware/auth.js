const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");
const auth = async (req, res, next) => {
  try { 
    const token = req.cookies.jwt;
     console.log(token);
    if (!token) {
      return res.status(401).json({ message:"token does not exist"});
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(401).json({message:"user are not found"});
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).send("Unauthorized: Invalid token");
  }
};
module.exports = auth;


// const jwt = require('jsonwebtoken')


// // const User = require('../models/users.models')
// const auth = async (req, res, next) => {
//   try{
//     const bearerHeader = req.headers['authorization']
//     console.log(bearerHeader)
//     if(typeof bearerHeader != 'undefined'){
//       const token = bearerHeader.split(' ')[1]
//       const user = jwt.verify(token, process.env.JWT_SECRET)
      
//       req.token = user
//       next()
//     }else{
//       res.status(401).json({message: 'No token provided'})
//     }
//   }catch(err){
//     res.status(403).json({message: 'Invalid or expired token'})
//   }
// }
// module.exports = auth

