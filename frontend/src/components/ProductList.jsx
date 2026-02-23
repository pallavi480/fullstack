import React, {useState,useEffect} from 'react'
import axios from 'axios'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [editID, setEditId] = useState(null)

    const [form,setForm]= useState({
        name:"",
        price:"",
        description:""
    })

   
    const fetchProduct = async()=>{
        const res = await axios.get("http://localhost:5000/api/product/get");

        setProducts(res.data)
    }

    const deletefun = async(id) =>{
       
    const res = await axios.delete(`http://localhost:5000/api/product/delete/${id}`);
    fetchProduct()
    }


    const handleEdit = async(product)=>{
           setEditId(product._id)
           setForm({
            name:product.name,
            price:product.price,
            description:product.description
           })
    }

   const handleChange = (e)=>{
       setForm({...form, [e.target.name]:e.target.value})
   }

    const updateProduct = async()=>{
       const res = await axios.put(`http://localhost:5000/api/product/update/${editID}`,
        form
       );
     setEditId(null)
     setForm({
       name: "",
       price: "",
       description: "",
     });

     fetchProduct()
    }

    useEffect(()=>{
        fetchProduct();
    },[])


   

  return (
    <div>
      <h2>Products</h2>

      {editID && (
        <div style={{}}>
          <h3>Edit Product</h3>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
          />
          <button onClick={updateProduct}>Update Product</button>
        </div>
      )}

      {products.map((p) => (
        <div key={p._id}>
          <div style={{ border: "1px solid black" }}>
            <h1> {p.name} </h1>
            <h2>{p.price}</h2>
            <h3>{p.category}</h3>
            <button onClick={() => deletefun(p._id)}>Delete</button>
            <button onClick={() => handleEdit(p)}>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default ProductList