import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");
  const cart = JSON.parse(localStorage.getItem("cart"));


  const onAddToCart = (product) => {
    if (cart!==null && cart.find((item) => item.p_id === product.p_id)) {
      toast.success("Already in cart");
    } else {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/cart/add`, {
          productId: product.p_id,
          userId: user_id,
        })
        .then(() => {
          dispatch(addToCart(product));
          toast.success("Successfully added!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to add");
        });
    }
  };

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
        <button
          onClick={() => onAddToCart(item)}
          className={`bg-amber-300 cursor-pointer py-1 px-10 rounded-full -ml-1  `}
        >
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
