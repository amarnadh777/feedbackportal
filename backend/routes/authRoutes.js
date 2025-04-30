const express = require("express");
const router = express.Router(); 

const multer = require('multer')
const upload = multer({dest:"images/"})
const {register, login} = require("../controller/authControllers")


router.post("/register", upload.single("image"), register);
router.post("/login", login);


module.exports = router;
