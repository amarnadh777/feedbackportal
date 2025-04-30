const feedbackModel = require("../model/feedbackModel");
const productModel = require("../model/productModel");
const mongoose = require("mongoose");
const cloudinary = require('../config/cloudinary')
const fs = require('fs/promises')
const giveFeedback = async (req, res) => {

  try {
    const { productId, feedback, rating } = req.body;
    const userId = req.user.userId;
    

    if (!productId || !feedback || !rating) {
      return res.status(400).json({
        message: "Please provide productId, feedback, and rating.",
      });
    }

    if (rating <= 0 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5.",
      });
    }

    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    let imageUrl = null;

    
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = imageUpload.secure_url;
       await fs.unlink(req.file.path)
    }




    const newFeedback = new feedbackModel({
      productId,
      feedback,
      rating,
      image:imageUrl,
      createdBy: userId,
    });

    await newFeedback.save();
    const populatedFeedback = await feedbackModel.findById(newFeedback._id).populate('createdBy',"fullname profilePic");
    res.status(201).json({
      message: "Feedback submitted successfully.",
      data: populatedFeedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while submitting feedback.",
    });
  }
};

const getFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid or missing feedbackId",
      });
    }

    const feedback = await feedbackModel.findById(id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(201).json({
      message: "Feedback fetched successfully ",
      data: {
        feedbackId: feedback._id,
        productId: feedback.productId,
        feedback: feedback.feedback,
        rating: feedback.rating,
        createdAt: feedback.createdAt,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "An error occurred ",
    });
  }
};

const getProductFeedback = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid or missing productId",
      });
    }

    const feedback = await feedbackModel
      .find({ productId: productId })
      .populate("createdBy", "fullname username profilePic").populate("responsedBy", "fullname username profilePic");

    console.log(feedback);
    if (feedback.length === 0) {
      return res.status(404).json({
        message: "No feedback found for this product",
      });
    }

    res.status(201).json({
      message: "Feedback fetched successfully ",
      data: feedback,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "An error occurred ",
    });
  }
};




  const getMyfeedback = async(req,res) =>
  {
    try {
      const userId = req.user.userId

     
      const feedback = await  feedbackModel.find({createdBy:userId}).populate("createdBy","fullname , profilePic").populate("responsedBy","fullname profilePic")
      res.status(201).json({
        message:"Feedback fetched successfully",
        data:feedback
      })

    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "An error occurred ",
      });
    }
  }


  const deletFeedback = async(req,res) =>

    {
           try {
             const {feedbackId} = req.params
             const userId = req.user.userId


             if(!feedbackId  || !mongoose.Types.ObjectId.isValid(feedbackId))
             {
              return res.status(400).json({
                message: "Invalid or missing feedbackId",
              });
             }
             const feedback = await feedbackModel.findById(feedbackId)
             if (!feedback) {
              return res.status(404).json({ message: "Feedback not found." });
            }

            console.log(userId,feedback.createdBy.toString())
            if(feedback.createdBy.toString() !== userId )
            {
              return res.status(403).json({ message: "Only author can delete the feedback" });
            }
              
            await feedbackModel.findByIdAndDelete(feedbackId);


            res.status(200).json({ message: "Feedback deleted successfully." });
           } catch (error) {
            console.error("Delete Feedback Error:", error);
    res.status(500).json({ message: "An error occurred while deleting feedback." })
           }
    }





    const editFeedback = async (req, res) => {
      try {
        const { feedbackId } = req.params;
        
        const userId = req.user.userId;
        const { feedback, rating } = req.body;

        if (!feedbackId || !mongoose.Types.ObjectId.isValid(feedbackId)) {
          return res.status(400).json({
            message: "Invalid or missing feedbackId",
          });
        }
    
        const existingFeedback = await feedbackModel.findById(feedbackId);
        if (!existingFeedback) {
          return res.status(404).json({ message: "Feedback not found." });
        }
    
        if (existingFeedback.createdBy.toString() !== userId) {
          return res.status(403).json({ message: "Only author can edit the feedback" });
        }
    
        
        if (!feedback && (rating === undefined || rating === null)) {
          return res.status(400).json({ message: "No feedback or rating provided for update." });
        }
    
      
        let updateData = {};
        if (feedback) updateData.feedback = feedback;
        if (rating !== undefined && rating !== null) updateData.rating = rating;
    
        const updatedFeedback = await feedbackModel.findByIdAndUpdate(
          feedbackId,
          updateData,
          { new: true } 
        );
    
        res.status(200).json({
          message: "Feedback updated successfully.",
          data: updatedFeedback,
        });
      } catch (error) {
        console.error("Edit Feedback Error:", error);
        res.status(500).json({ message: "An error occurred while editing feedback." });
      }
    };
    

    const getFeedbackByLowRating = async (req, res) => {
      try {
        const { productId } = req.params;

    
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ message: "Invalid or missing productId." });
        }
    
        const feedback = await feedbackModel
          .find( {productId:productId})
          .populate("createdBy", "fullname username profilePic")
          .sort({ rating: 1 });
        if (feedback.length === 0) {
          return res.status(404).json({ message: `No feedback found  for this product.` });
        }
    
        res.status(200).json({
          message: `Feedback with  low to high rating fetched successfully.`,
          data: feedback,
        });
    
      } catch (error) {
        console.error("Get Feedback By Low Rating Error:", error);
        res.status(500).json({ message: "An error occurred while fetching low rating feedback." });
      }
    };
    




    const getFeedbackByHighRating = async (req, res) => {
      try {
        const { productId } = req.params;

    
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ message: "Invalid or missing productId." });
        }
    
        const feedback = await feedbackModel
          .find( {productId:productId})
          .populate("createdBy", "fullname username profilePic")
          .sort({ rating: -1 });
        if (feedback.length === 0) {
          return res.status(404).json({ message: `No feedback found  for this product.` });
        }
    
        res.status(200).json({
          message: `Feedback with   high to low rating fetched successfully.`,
          data: feedback,
        });
    
      } catch (error) {
        console.error("Get Feedback By Rat high rating Error:", error);
        res.status(500).json({ message: "An error occurred while fetching low rating feedback." });
      }
    };

module.exports = {
  giveFeedback,
  getFeedback,
  getProductFeedback,
  getMyfeedback,
  deletFeedback,
  editFeedback,
  getFeedback,
  getFeedbackByLowRating ,
  getFeedbackByHighRating
};
