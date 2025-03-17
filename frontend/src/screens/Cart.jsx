import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const cartItem = useSelector((state) => state.cartReducer.cart);

  
  const [price,setPrice] = useState();
  const [quantiy,setquantity] = useState();

  
  useEffect(()=>{
    let totalPrice=0;
    let totalquantity = 0;
    cartItem.forEach((item)=>{
          totalquantity+=item.quantity;
          totalPrice+= item.price * item.quantity
        })
    setPrice(totalPrice)
    setquantity(totalquantity)
  },[cartItem])
  console.log(cartItem);
  
  return (
   
    <div className="flex flex-col min-h-screen">
  <div className="mx-2 flex-grow">
    <h1 className="font-semibold my-3">Shopping Cart</h1>
    
    <div className="flex flex-col gap-2 justify-center mb-16">
      {
        cartItem.length > 0 
        ? cartItem.map((item) => (
            <CartItem key={item.cart_id} item={item} />
          ))
        : <EmptyCart />
      }
    </div>
  </div>


  <div className="bg-zinc-300 fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[33rem] h-9 rounded-xl flex items-center justify-end px-4">
    <p>Subtotal({quantiy} item): $:{price}</p>
  </div>
</div>

  );
};

export default Cart;
