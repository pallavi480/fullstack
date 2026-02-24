import React, {useState} from 'react'
import axios from "axios"


const ProductForm = () => {
    const [product,setProduct] = useState({
        name:"",
        price:"",
        description:""
    })
  
    const handleSubmit = async(e)=>{
        try {
              e.preventDefault();
              await axios.post(
                "http://localhost:5000/api/products/create",
                product
              );
              alert("Product added")
        } catch (error) {
            console.log(error)
        }
      
    }

    const handleChange = (e)=>{
      setProduct({...product, [e.target.name]:e.target.value})
    }


  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        onChange={handleChange}
      />
      <button>Add Product</button>
    </form>
  );
}

export default ProductForm

