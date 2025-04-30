const productModel = require("../model/productModel");

const getAllproduct = async(req,res) =>
    
    {  try {
        const products = await  productModel.find({}) 
        res.status(200).json(  {message:"fetich all products",  products});        
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error. Could not fetch products.' });
      }

    }
module.exports = {getAllproduct}