const express = require("express");
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/productController");

// GET /products
router.get("/", getProducts);

// POST /products (Add a new product)
router.post("/", addProduct);

// PUT /products/:id (Update an existing product)
router.put("/:id", updateProduct);

// DELETE /products/:id (Delete a product)
router.delete("/:id", deleteProduct);

module.exports = router;
