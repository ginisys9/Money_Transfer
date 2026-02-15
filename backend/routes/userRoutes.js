
const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const  auth = require("../middleware/auth");
router.get('/',userController.getUser)
router.post("/",userController.createUser)
router.post("/login",userController.logInUser)
router.delete('/',userController.clearUser)
router.get("/logout",userController.logOutUser)
router.get("/getprofile",auth,userController.getProfile)
module.exports = router
