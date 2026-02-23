import express from "express";
import productController from "../controller/ProductController.js";

const router = express.Router();

router.post("/create", productController.createProduct);
router.get("/all", productController.getProducts);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

export default router;