const mongoose = require('mongoose');

// Variant sub-schema
const variantSchema = new mongoose.Schema({
  ram: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

// Product schema 
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subCategoryId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  variants: [variantSchema],
  imageUrls: [{
    type: String
  }],
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;