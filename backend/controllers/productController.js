const products = require("../data/products");


exports.getProducts = async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
  
    const paginatedProducts = products.slice(offset, offset + limit);
  
    res.json({
      products: paginatedProducts,
      total: products.length,
    });
  };
  


// Add a new product
exports.addProduct = (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Simple id generation logic
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Update an existing product by id
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  
  const productIndex = products.findIndex((p) => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  products[productIndex] = { id: parseInt(id), name, price };
  res.json(products[productIndex]);
};

// Delete a product by id
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct);
};
