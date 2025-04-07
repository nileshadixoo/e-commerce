


import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminProductcard from "../components/AdminProductcard";
import { CgPlayListAdd } from "react-icons/cg";
import { useNavigate } from "react-router";

const url = import.meta.env.VITE_BASE_URL;



const AdminDashboard = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 
  

  // useEffect(() => {
  //   axios
  //     .get(`${url}/products/get-all`)
  //     .then((res) => {

  //       setProducts(res.data.products)
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(setLoading(false))

   
  // }, [products]);
  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`${url}/products/get-all`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className=" h-screen px-5 py-2 ">
      <div className="flex items-center justify-between">
      <h2 className="text-xl font-medium">Products</h2>
      <h2 className="text-xl"><CgPlayListAdd onClick={()=>navigate("/dashboard/add")}/></h2>
      </div>
      <div className="mt-5 flex gap-3 flex-wrap items-center justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.map((item) => (
            <AdminProductcard
          
              key={item.p_id}
              item={item}
              
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
