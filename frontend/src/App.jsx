import React, { lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";

// code splitting
const Home = lazy(()=>import("./screens/Home"))
const Cart = lazy(()=>import("./screens/Cart"))
const SearchPage = lazy(()=>import("./screens/SearchPage"))

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;
