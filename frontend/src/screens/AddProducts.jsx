import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddProducts = () => {
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [price, setPrice] = useState(0);
      const [quantity, setQuanity] = useState(0);
      const [color, setColor] = useState("");
      const [category, setCategory] = useState("");
      const [productImg, setProductImg] = useState(null);
      const token = localStorage.getItem("token");
      const navigate = useNavigate();

      
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setProductImg(file);
    }
  };
 console.log( productImg)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post(
//         `http://localhost:8000/products/upload`,
//         {
//           name,
//           description,
//           price,
//           quantity,
//           category,
//           color,
//           "product-img":productImg,
//         },
//         {
//           headers: {
//             token: token,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data)
//         // toast.success(res.data.message);

//         navigate("/");
//       })
//       .catch((err) => {
//         console.log(err)
//         // toast.error(err.response.data.message)
//       });
//   };

const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a new FormData object to handle the file and form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", quantity);
    formData.append("category", category);
    formData.append("color", color);
    formData.append("product-img", productImg); // Append the file
  
    // Send the form data via a POST request
    axios
      .post(
        "http://localhost:8000/products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Optional, axios will set it automatically when using FormData
            token: token,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        
        navigate("/dashboard"); // Redirect after success
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong")
        // navigate('/dashboard')
      });
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              stock
            </label>
            <input
              type="number"
              name="price"
              value={quantity}
              onChange={(e) => setQuanity(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="price"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              name="price"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
            required
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProducts