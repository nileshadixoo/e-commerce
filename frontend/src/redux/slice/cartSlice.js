import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        console.log("found in cart");
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity < 50) {
        item.quantity++;
      }
    },
    decrementQuanity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    deleteFromCart: (state, action) => {
        console.log("delete called");
        
       state.cart =state.cart.filter((item) => item.id !== action.payload.id);
      
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuanity,deleteFromCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
