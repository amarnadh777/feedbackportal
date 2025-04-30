const express = require("express");
const router = express.Router(); 


const { giveFeedback, getFeedback, getProductFeedback,getMyfeedback,deletFeedback, editFeedback ,getFeedbackByLowRating ,  getFeedbackByHighRating} = require("../controller/feedbackControllers");
const jwtVerify = require("../middleware/jwtVerify");
const multer = require('multer')
const upload = multer({dest:"images/"})

router.post("/create",jwtVerify,upload.single("image"),giveFeedback);
router.get("/getfeedback/:id",getFeedback)
router.get("/product/:productId",getProductFeedback)
router.get("/myfeedback",jwtVerify,getMyfeedback)
router.delete("/delete/:feedbackId",jwtVerify,deletFeedback)
router.put("/edit/:feedbackId",jwtVerify,upload.single("image"),editFeedback)
router.get("/lowtohigh/:productId",jwtVerify,getFeedbackByLowRating )
router.get("/hightolow/:productId",jwtVerify,getFeedbackByHighRating)




module.exports = router;
