import express from "express";
import productController from "../controller/ProductController.js";

const router = express.Router();

const { createProduct, getProducts, updateProduct, deleteProduct } = productController;

router.post("/create", createProduct);
router.get("/all", getProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;

