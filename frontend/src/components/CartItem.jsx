import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { decrementQuanity, deleteFromCart, incrementQuantity } from '../redux/slice/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';


const CartItem = ({item}) => {
  const user_id = JSON.parse(localStorage.getItem("user_id"))

   const dispatch = useDispatch();
   const onIncrement = (item)=>{
    axios
    .put(`${import.meta.env.VITE_BASE_URL}/cart/increment-count`, {
      productId: item.p_id,    
    })
    .then(() => {
      dispatch(incrementQuantity(item))
    })
    .catch((err) => {
      console.log(err);
 
   })
  }
   const onDecrement = (item)=>{
    axios
    .put(`${import.meta.env.VITE_BASE_URL}/cart/decrement-count`, {
      productId: item.p_id,    
    })
    .then(() => {
      dispatch(decrementQuanity(item))
    })
    .catch((err) => {
      console.log(err);
 
   })
    
   }
   const onDelete = (item)=>{
    axios
    .delete(`${import.meta.env.VITE_BASE_URL}/cart/delete`, {
      data: {
        productId: item.p_id, // Send productId in the body
        userId: user_id, // Send userId in the body
      },
    })
    .then(() => {
      dispatch(deleteFromCart(item))
      toast.success("Removed")
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong")
 
   })
    
   }

  return (
    <div className='w-full rounded-2xl bg-gray-100 flex items-center justify-between py-3 px-5 '>
        <div className='w-80'>
        <img
        className='h-40 w-64 '
        src={item.img} alt="" />
        </div>

        <div className='w-full '>
        <div className='px-3 space-y-1'>
            <h1 className='font-medium'>{item.name}</h1>
            <p>${item.price}</p>
            <p>Rating:{item?.rating?.rate}</p>
            <div className=' -px-1 flex items-center gap-1 border rounded-2xl w-15 justify-center cursor-pointer '>
            <button
            onClick={()=>onDecrement(item)}
            className='p-1 text-xs cursor-pointer '><FaMinus /></button>
            {item.quantity}
            <button 
            onClick={()=>onIncrement(item)}
            className='p-1  text-xs cursor-pointer'><FaPlus /></button>
            </div>
            <button
            onClick={()=>onDelete(item)}
            className='text-red-500 cursor-pointer'>Delete</button>
            
        </div>


        


        </div>
        </div>
  )
}

export default CartItem