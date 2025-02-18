import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const onAddToCart = (product) => {
    dispatch(addToCart(product));

    toast.success("Successfully toasted!");
  };

  return (
    <div className="p-3  min-w-60 max-w-64 rounded-2xl flex flex-col items-center justify-center ">
      <img className="h-40 w-40 rounded-2xl" src={item.image} alt="" />

      <div className="mt-3 ml-2 space-y-2">
        <h3 className="font-medium text-lg">{item.title}</h3>
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
          className="bg-amber-300 py-1 px-10 rounded-full -ml-1 cursor-pointer"
        >
          <FaCartPlus  />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
