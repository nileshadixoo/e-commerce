import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

const SearchPage = () => {

  const [search,setSearch] = useState('')
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  
  const handleInput = (e)=>{
    e.preventDefault();
    setSearch((e.target.value.toLowerCase()))
    
    
  }
 
  useEffect(()=>{
    let timeoutId ;
    if(search){
       timeoutId =setTimeout(() => {
        axios.get(`https://fakestoreapi.in/api/products/category?type=${search}`)
      .then(res=>setProducts(res.data.products))
      
      .catch(err=>console.log(err)
      )
      }, 1000);
    }
  
    setLoading(false)

   return ()=>{
    clearInterval(timeoutId)
   }
    
  },[search])
  
  
  

  return (
   <>
   
   <div className='flex justify-center '>
    <input
    className=' bg-zinc-100 min-w-80 px-3 mt-1  rounded-full p-1'
    placeholder='search here'
    value={search}
    onChange={handleInput}
    type="text" />
   </div>
   <div className="mt-5 flex gap-3 flex-wrap items-center justify-center">

    {
      loading ? (<div>Loading...</div> ) :
      products.length<=0 ? (<div>Search product</div> ):
      (products.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          
        />
      )))
    }

      </div>
   
   </>
  )
}

export default SearchPage