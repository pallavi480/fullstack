import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
})

const productModel = mongoose.model("product", productSchema)

export default productModel