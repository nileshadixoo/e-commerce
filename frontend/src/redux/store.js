import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice";

const store = configureStore({
    reducer:{
        cartReducer,
    }
})

export default store