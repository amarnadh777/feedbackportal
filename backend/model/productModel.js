const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: String,
  price: Number,
  description: String,
  image: String
});


const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
