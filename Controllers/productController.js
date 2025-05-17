const Products = require('../Model/productModel')

// Add a new product
exports.addProducts = async (req, res) => {
  console.log("inside the add product function");
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { title, subCategoryId, description } = req.body;

  // If variants is a string (from form-data), parse it
  let variants = req.body.variants;
  if (typeof variants === 'string') {
    try {
      variants = JSON.parse(variants);
    } catch (err) {
      return res.status(400).json({ message: "Invalid 'variants' format. Must be JSON." });
    }
  }

  // Make sure file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image upload required." });
  }

  const imageUrl = req.file.filename;
  const userId = req.payload; // Fix typo if it was `paylod` earlier

  try {
    const newProduct = new Products({
      title,
      subCategoryId,
      description,
      variants,
      imageUrl,
      userId
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Failed to add product",
      error: err.message,
      details: err.errors
    });
  }
};


// Get all products
exports.getAllProducts = async(req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json(products)
    } catch(err) {
        console.log(err)
        res.status(404).json(err)
    }
} 

// Get product by ID
exports.getProductById = async(req, res) => {
    const { id } = req.params
    
    try {
        const product = await Products.findById(id)
        
        if(product) { 
            res.status(200).json(product)
        } else {
            res.status(404).json("Product not found")
        }
    } catch(err) {
        console.log(err)
        res.status(404).json(err)
    }
}

// Get products by subcategory
exports.getProductsBySubCategory = async(req, res) => {
    const { subCategoryId } = req.params
    
    try {
        const products = await Products.find({ subCategoryId })
        res.status(200).json(products)
    } catch(err) {
        console.log(err)
        res.status(404).json(err)
    }
}

// Get user's products
exports.getUserProducts = async(req, res) => {
    const userId = req.params.userId || req.userId
    
    try {
        const products = await Products.find({ userId })
        res.status(200).json(products)
    } catch(err) {
        console.log(err)
        res.status(404).json(err)
    }
}

// Update product
exports.updateProduct = async(req, res) => {
    const { id } = req.params
    const updates = req.body
    
    try {
        const existingProduct = await Products.findById(id)
        
        if(!existingProduct) {
            return res.status(404).json("Product not found")
        }
        
        // Optional: Check if user owns this product
        // if(existingProduct.userId !== req.userId) {
        //     return res.status(403).json("Not authorized to update this product")
        // }
        
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        )
        
        res.status(200).json(updatedProduct)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// Delete product
exports.deleteProduct = async(req, res) => {
    const { id } = req.params
    
    try {
        const existingProduct = await Products.findById(id)
        
        if(!existingProduct) {
            return res.status(404).json("Product not found")
        }
        
        // Optional: Check if user owns this product
        // if(existingProduct.userId !== req.userId) {
        //     return res.status(403).json("Not authorized to delete this product")
        // }
        
        await Products.findByIdAndDelete(id)
        res.status(200).json("Product deleted successfully")
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// Search products
exports.searchProducts = async(req, res) => {
    const { query } = req.query
    
    try {
        if(!query) {
            return res.status(400).json("Search query is required")
        }
        
        const products = await Products.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        })
        
        res.status(200).json(products)
    } catch(err) {
        console.log(err)
        res.status(404).json(err)
    }
}