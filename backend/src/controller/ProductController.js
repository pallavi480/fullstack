import productModel from "../models/Productmodel.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const product = new productModel({
      name,
      price,
      description
    });

    const saved = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      data: saved
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(id, { name, price, description }, { new: true });
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
export default { createProduct, getProducts, updateProduct, deleteProduct };


