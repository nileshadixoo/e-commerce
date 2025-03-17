import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice";
import { userReducer } from "./slice/userSlice";

const store = configureStore({
    reducer:{
        cartReducer,
        userReducer
    }
})

export default store