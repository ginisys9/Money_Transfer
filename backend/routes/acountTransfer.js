const express = require("express");
const router = express.Router();
const acountController = require("../controller/acountController")
router.get("/",acountController.getAcounts)
router.delete("/",acountController.clearAcount)

module.exports = router
