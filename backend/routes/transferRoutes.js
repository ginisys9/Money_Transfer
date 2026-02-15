const express = require("express");
const router = express.Router();
const transferController = require("../controller/transferController")
const  noAuth  = require("../middleware/auth")
router.post("/",noAuth,transferController.makeTransfer)
router.get("/",noAuth,transferController.getTransfer)
router.delete("/",transferController.clearTransfer)

module.exports = router