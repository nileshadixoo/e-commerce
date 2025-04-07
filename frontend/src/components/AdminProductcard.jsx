

import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios"
import toast from "react-hot-toast";
import {Link} from "react-router"

const AdminProductcard =({ item }) => {
    const token = localStorage.getItem('token')
    const deleteProduct=(item)=>{
         axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${item.p_id}`,{
            headers:{
                Authorization:token
            }
        })
        // fetchProducts()
  .then(response => {
    toast.success(response.data.message);
    
    
  })
  .catch(error => {
    console.error(error);
  });
}

  return (
    <div className="p-3  min-w-60 max-w-64 rounded-2xl flex flex-col items-center justify-center ">
      <img className="h-40 w-56 rounded-2xl" src={item.img} alt="" />

      <div className="mt-3 ml-2 space-y-2">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <h4 className="text-xs text-gray-700">
          {item.description.length < 130
            ? item.description
            : item.description.slice(0, 130) + "..."}
        </h4>
        <div className="flex items-center justify-between">
          <p className="font-medium text-xs">$ {item.price}</p>
          <p className="font-light text-xs">Rating: {item?.rating?.rate}</p>
        </div>
       <div className="flex items-center justify-center gap-4">
       <Link to={`/dashboard/${item.p_id}`}
          
          className="bg-amber-300 py-1 px-10 rounded-full -ml-1 cursor-pointer flex items-center gap-2"
        >
          <FiEdit />  
            
        </Link>
        <button
          onClick={() => deleteProduct(item)}
          className="bg-red-400 py-1 px-10 rounded-full -ml-1 cursor-pointer flex items-center gap-2"
        >
          <MdDeleteForever />
            
        </button>
       </div>
        
      </div>
    </div>
  )
}

export default AdminProductcard;
