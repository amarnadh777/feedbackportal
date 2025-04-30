const express = require("express");
const { createProduct,resposeToafeedback ,getMyresponse, editMyresponse,deleteresponse} = require("../controller/adminControllers");
const jwtVerify = require("../middleware/jwtVerify");
const isAdmin = require("../middleware/isAdmin")
const router = express.Router(); 
const multer = require('multer')
const upload = multer({dest:"images/"})


router.post("/create/product",upload.single("image"),jwtVerify,isAdmin,createProduct);
router.post("/feedback/response",jwtVerify,isAdmin,resposeToafeedback)
router.get("/myrespones",jwtVerify,isAdmin,getMyresponse)
router.put("/editrespones",jwtVerify,isAdmin,editMyresponse)
router.delete("/deleteresponse",jwtVerify,isAdmin,deleteresponse)



module.exports = router