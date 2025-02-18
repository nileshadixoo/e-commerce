import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 
  

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false))

   
  }, []);
 

  return (
    <div className=" h-screen px-5 py-2 ">
      <h2 className="text-xl font-medium">Products</h2>
      <div className="mt-5 flex gap-3 flex-wrap items-center justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
