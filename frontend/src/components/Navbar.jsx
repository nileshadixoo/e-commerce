import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";


const Navbar = () => {
  const cartItem = useSelector((state) => state.cartReducer.cart);
  

  return (
    <nav className="p-3  flex  justify-between bg-zinc-100">
      <div>
        <Link to='/' className="text-2xl font-semibold ">Brand</Link>
      </div>
     
      <div className="flex items-center justify-center gap-2">
      <Link to='/search'>
      <FaSearch />
      </Link>
      <Link className="relative " to="/cart">
        {
          cartItem.length > 0 && (
            <span className="absolute bottom-3 left-3 text-xs bg-red-500 rounded-full h-4 w-4 text-center text-white">
          {cartItem.length}
        </span>
          )
        }
        <FaShoppingCart className="text-xl" />
      </Link>
      
      </div>
    </nav>
  );
};

export default Navbar;
