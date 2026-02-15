const User = require("../schema/userSchema");
const Acount = require("../schema/acountSchema");
const { generateAcountNumnber, generatePin,generateToken } = require("../utils/util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser = async (req, res) => {
  const user = await User.find();
  res.status(401).json(user);
};
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    const acount = await Acount.create({
      user: user._id,
      acountNumber: generateAcountNumnber(),
      pin: generatePin(),
    });
    const jwt = generateToken(user._id);
    /**
     * ! set cookie in the token
     */
    res.cookie("jwt",jwt,{ httpOnly:true, maxAge:60 * 60 * 1000});
   return  res.status(201).json({ user, acount,token});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const logInUser = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(401).json("inavlid password");
    }
     const jwt = jwt.sign({ id:user._id},process.env.JWT_SECRET,{
      expiresIn: "1h",
    });
     res.cookie("jwt",jwt,{ httpOnly:true, maxAge:60 * 60 * 1000});
    res.status(201).json({user})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
/**
 * ! logOutUser 
 */
const logOutUser = async (req,res) => {
  res.clearCookie('token')
 return res.status(201).json("logout successfully")
 }
 /**
  * ! getProfile user
  */
 const getProfile = async (req,res)=>{
   return res.json(req.user)
 }
const clearUser = async (req, res) => {
 await User.deleteMany();
 return res.status(401).json({ message: "use deleted successfully" });
};
module.exports = {
  getUser,
  createUser,
  clearUser,
  logInUser,
  logOutUser,
  getProfile
};