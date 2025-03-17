import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return [];
};
const savedCartState = loadCartFromLocalStorage()
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart:savedCartState },
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      state.cart = action.payload; // Set the cart from localStorage
    },
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.p_id === action.payload.p_id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
       state.cart.push({ ...action.payload, quantity: 1 }); 
      }
      localStorage.setItem('cart',(JSON.stringify(state.cart)))
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity < 50) {
        item.quantity++;
      }
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    decrementQuanity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    deleteFromCart: (state, action) => {  

      state.cart = state.cart.filter((item) => item.p_id !== action.payload.p_id)
      localStorage.setItem('cart',JSON.stringify(state.cart)); 
    },
    emptyCart:(state,action)=>{
      state.cart = [];
      localStorage.removeItem('cart')
    }
  },
});


export const { addToCart, incrementQuantity, decrementQuanity,deleteFromCart,emptyCart,setCartFromLocalStorage } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
