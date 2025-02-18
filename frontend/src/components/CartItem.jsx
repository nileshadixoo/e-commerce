import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { decrementQuanity, deleteFromCart, incrementQuantity } from '../redux/slice/cartSlice';
import toast from 'react-hot-toast';


const CartItem = ({item}) => {

   const dispatch = useDispatch();
   const onIncrement = (item)=>{
    dispatch(incrementQuantity(item))
   }
   const onDecrement = (item)=>{
    dispatch(decrementQuanity(item))
   }
   const onDelete = (item)=>{
    dispatch(deleteFromCart(item))
    toast.success("Removed")
   }

  return (
    <div className='w-full rounded-2xl bg-gray-100 flex items-center justify-between py-3 px-5 '>
        <div className='w-56'>
        <img
        className='h-40 w-40 '
        src={item.image} alt="" />
        </div>

        <div className='w-full '>
        <div className='px-3 space-y-1'>
            <h1 className='font-medium'>{item.title}</h1>
            <p>₹{item.price}</p>
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