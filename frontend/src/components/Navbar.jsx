import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { emptyCart } from "../redux/slice/cartSlice";
import { userNotExist } from "../redux/slice/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  let cartItem =[] ;  

  const dispatch = useDispatch();
  const isAdmin = localStorage.getItem("isAdmin");
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const handleLogout = () => {
    axios
      .get(`${import.meta.VITE_BASE_URL}/auth/logout`)
      .then(() => {
        toast.success("Logged out Successfully");

        dispatch(userNotExist());
        dispatch(emptyCart());
        localStorage.removeItem("cart");
        localStorage.removeItem("user_id");

        navigate("/login");
      })

      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  useEffect(()=>{
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/cart/get`, {
        params: {
          userId: user_id,
        },
      })
      .then((res) => {
        const cartData = res.data.cart
        localStorage.setItem("cart", JSON.stringify(cartData));
        cartItem = cartData
      })
      .catch((err) => {
        console.log(err);
      });
  },[])

  cartItem = useSelector(state=>state.cartReducer.cart)
  
  
 
  

  return (
    <nav className="p-3  flex  justify-between bg-zinc-100">
      <div>
        <Link to="/" className="text-2xl font-semibold ">
          Brand
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2">
        {(isAdmin == "true") && (
          <Link className="text-xl" to="/dashboard">
            <MdAdminPanelSettings />
          </Link>
        )}
        {isAuthenticated && (
          <>
            <Link to="/search">
              <FaSearch />
            </Link>
            <Link className="relative " to="/cart">
              {cartItem.length > 0 && (
                <span className="absolute bottom-3 left-3 text-xs bg-red-500 rounded-full h-4 w-4 text-center text-white">
                  {cartItem.length}
                </span>
              )}
              <FaShoppingCart className="text-xl" />
            </Link>
          </>
        )}

        {isAuthenticated && (
          <IoMdLogOut className="hover:cursor-pointer" onClick={handleLogout} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
