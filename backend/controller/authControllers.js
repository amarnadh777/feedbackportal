
const jwt = require('jsonwebtoken')
const userModel = require("../model/userModel"); 
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary")
const fs = require('fs/promises')
const register = async (req, res) => {
  try {
    const { username, password, fullname } = req.body;

    if (!username || !password || !fullname) {
      return res.status(400).json({
        message: "Please provide all required fields: username, password, fullname."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long."
      });
    }

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Username is already taken."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl = ""; 

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = imageUpload.secure_url;
      await fs.unlink(req.file.path)

    }

    const newUser = new userModel({
      username,
      password: hashedPassword,
      fullname,
      profilePic: imageUrl 
    });

    await newUser.save();

    const token = jwt.sign(
      { username: newUser.username, role: newUser.role, userId: newUser._id },
      "secret"
    );

    res.status(201).json({
      message: "User registered successfully.",
      token,
      username: newUser.username,
      fullname: newUser.fullname,
      profilePic: newUser.profilePic,
      role: newUser.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while registering the user."
    });
  }
};


  const  login = async (req, res) => {

   
    try {
      const { username, password } = req.body;
  
     
      if (!username || !password ) {
        return res.status(400).json({
          message: "Please provide all required fields: username, password"
        });
      }
  
  

  
     
      const user = await userModel.findOne({ username });
      if (!user || !password) {
        return res.status(400).json({
          message: "Username or password incorrect."
        });
      }
     const ismatch = await bcrypt.compare(password,user.password)
     if (!ismatch) {
        return res.status(400).json({
          message: "Invalid username or password."
        })
    }
     
    const token = jwt.sign({username:user.username,role:user.role,userId:user._id },"secret")
    res.status(200).json({
        message:"Login successfull",
        token,
        username: user.username,
        fullname: user.fullname,
        profilePic:user.profilePic,
        role: user.role
    })


  
     
    
    } catch (error) {
      console.error(error);
      res.status(500).json({
  
        message: "An error occurred "
      });
    }
  };



  module.exports = {register,login}