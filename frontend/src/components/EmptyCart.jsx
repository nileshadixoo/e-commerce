import React from 'react'
import { Link } from 'react-router'

const EmptyCart = () => {
  return (
    <div className='p-4 bg-zinc-100 flex items-center justify-center gap-4 '>
            <img
            className='h-25'
            src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" alt="" />
        <div>
            <h1 className='text-2xl'>Your cart is empty</h1>
            <Link to='/'
            className='text-blue-500 text-xs'
            >
            Shop today's deal
            </Link>
        </div>
    </div>
  )
}

export default EmptyCart