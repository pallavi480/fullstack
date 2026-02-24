import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editID, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");
        setProducts(res.data);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchProducts();
  }, []);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const addProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/create",
        form
      );

     
      setProducts([...products, res.data]);

      setForm({ name: "", price: "", description: "" });
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

 
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/delete/${id}`
      );

    
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  
  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };


  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/update/${editID}`,
        form
      );

      setProducts(
        products.map((p) =>
          p._id === editID ? { ...p, ...form } : p
        )
      );

      setEditId(null);
      setForm({ name: "", price: "", description: "" });
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      
      <div style={{ marginBottom: "20px" }}>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        {editID ? (
          <button onClick={updateProduct}>Update Product</button>
        ) : (
          <button onClick={addProduct}>Add Product</button>
        )}
      </div>

     
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid black",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{p.name}</h3>
            <p>Price: {p.price}</p>
            <p>Description: {p.description}</p>

            <button onClick={() => deleteProduct(p._id)}>
              Delete
            </button>

            <button onClick={() => handleEdit(p)}>
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;