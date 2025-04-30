const productModel = require("../model/productModel");
const cloudinary = require("../config/cloudinary");
const feedbackModel = require("../model/feedbackModel");
const fs = require('fs').promises; 
const createProduct = async (req, res) => {
  try {
    const { productName,description } = req.body;
    let price = parseFloat(req.body.price)
    if (!productName || !price || !description) {
      return res.status(400).json({
        message: "Please provide both productName and price."
      });
    }

 
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        message: "Price must be a valid positive number."
      });
    }
    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({
        message: "Description must be a valid non-empty string with at least 10 characters."
      });
    }
    if(!req.file)
{
  return res.status(400).json({
    message: "Please provie image"
  });
}     


    const imageUpload = await  cloudinary.uploader.upload(req.file.path)
     await fs.unlink(req.file.path)

    const newProduct = new productModel({
      productName,
      price,
      description,
      image:imageUpload.secure_url
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully.",
      product: newProduct 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating product."
    });
  }
};



const resposeToafeedback = async(req,res) =>
{
  try {
    const { feedbackId, response } = req.body;
    if (!feedbackId || !response) {
      return res.status(400).json({ message: "Feedback ID and response are required" });
    }
    const feedback = await feedbackModel.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    const updatedFeedback = await feedbackModel.findByIdAndUpdate(
      feedbackId, 
      {
        response: response,
        responsedBy: req.user.userId, 
      },
      { new: true }  
    );

    return res.status(200).json({ message: "Response added successfully", feedback: updatedFeedback });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while responding to feedback" });
  }
}


const getMyresponse = async (req, res) => {
  try {
    const userId = req.user.userId;


    const responses = await feedbackModel.find({ responsedBy:userId }).populate("responsedBy","fullname profilePic").populate("createdBy","fullname profilePic")


    res.status(200).json({
      data: responses
    });

  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({
      message: "Failed to fetch responses"
    });
  }
};



const editMyresponse = async (req, res) => {
  try {
    const { userId } = req.user;

    const {response,feedbackId } = req.body;  
    console.log(feedbackId,response)
    if (!response || !feedbackId) {
      return res.status(400).json({ message: "Feedback ID and response are required" });
    }
    const feedback = await feedbackModel.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

 
    if ( feedback.responsedBy != userId || feedback.responsedBy.toString() != userId) {
      return res.status(403).json({ message: "You are not authorized to edit this response" });
    }

   
  feedback.response = response


    
    const updatedFeedback = await feedback.save();

    res.status(200).json({
      message: "Feedback updated successfully",
      data: updatedFeedback
    });

  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({
      message: "Failed to update feedback"
    });
  }
};



const deleteresponse = async (req, res) => {
  try {
    console.log(req.body)
    const { userId } = req.user;
    const { feedbackId } = req.body;

    if (!feedbackId) {
      return res.status(400).json({ message: "Feedback ID is required" });
    }

    const feedback = await feedbackModel.findById(feedbackId);

    if (!feedback.responsedBy) {
      return res.status(404).json({ message: "no response found" });
    }

    if (  feedback.responsedBy != userId  || feedback.responsedBy.toString() != userId) {
      return res.status(403).json({ message: "You are not authorized to delete this response" });
    }


     const deleteresponse =  await feedbackModel.updateOne(
      { _id: feedbackId },
      { $unset: { response: "", responsedBy: "" } }
    );


    res.status(200).json({ message: "Response deleted successfully", data: deleteresponse });

  } catch (error) {
    console.error("Error deleting response:", error);
    res.status(500).json({ message: "Failed to delete response" });
  }
};

module.exports = { createProduct,resposeToafeedback,getMyresponse ,editMyresponse,deleteresponse};
