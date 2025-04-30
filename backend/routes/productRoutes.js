const express = require("express");
const jwtVerify = require("../middleware/jwtVerify");
const { getAllproduct } = require("../controller/productControllers");
const router = express.Router(); 

router.get("/", getAllproduct);
module.exports = router