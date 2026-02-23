import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editID, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  // ✅ Fetch Products
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products/all"
      );

      console.log("DATA:", res.data); // Debug
      setProducts(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  // ✅ Delete Product
  const deletefun = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/delete/${id}`
      );
      fetchProduct(); // Auto refresh
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // ✅ Edit Click
  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  // ✅ Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Update Product
  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/update/${editID}`,
        form
      );

      setEditId(null);
      setForm({
        name: "",
        price: "",
        description: "",
      });

      fetchProduct(); // Auto refresh
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // ✅ Live Search Filter
  const filteredProducts = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {/* ✏ Edit Section */}
      {editID && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Edit Product</h3>

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

          <button onClick={updateProduct}>
            Update Product
          </button>
        </div>
      )}

      {/* 📦 Product List */}
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        filteredProducts.map((p) => (
          <div key={p._id} style={{ border: "1px solid black", marginBottom: "10px", padding: "10px" }}>
            <h3>{p.name}</h3>
            <p>Price: {p.price}</p>
            <p>Description: {p.description}</p>

            <button onClick={() => deletefun(p._id)}>
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