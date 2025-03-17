import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { userExist } from "../redux/slice/userSlice";
import { setCartFromLocalStorage } from "../redux/slice/cartSlice";

const Login = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPasswords] = useState("");
  const navigate = useNavigate();

  const addCartToLocal = () => {
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
        dispatch(setCartFromLocalStorage(cartData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`${url}/auth/login`, {
        email,
        password,
      })
      .then(function (response) {
        if (response.data.success) {
          dispatch(userExist(response.data.user));
          localStorage.setItem("isAdmin", false);
          if (response.data.user.role === "admin") {
            localStorage.setItem("isAdmin", true);
          }

          localStorage.setItem("token", response.data.token);
          toast.success("User Registered");
          localStorage.setItem("user_id", response.data.user.user_id);
          localStorage.setItem("isAuthenticated", true);
          addCartToLocal()
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);

        toast.error(error.response.data.message);
      });

    setEmail("");
    setPasswords("");
  };

  
  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="border p-4 rounded-2xl">
        <h1 className="mb-3 font-bold">Login</h1>
        <form className="flex flex-col space-y-2" onSubmit={submitHandler}>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border py-1 px-2 rounded-xl"
            type="email"
            placeholder="Enter your email"
          />
          <input
            required
            value={password}
            onChange={(e) => setPasswords(e.target.value)}
            className="border py-1 px-2 rounded-xl"
            type="password"
            placeholder="Your password"
          />
          <button className="bg-green-600 rounded-xl py-1">Submit</button>
        </form>
        <div className="text-xs text-center my-2">
          <p className="">Create account</p>
          <Link className="text-blue-600" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
