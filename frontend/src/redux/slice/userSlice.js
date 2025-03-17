import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // user:{
    // //    username:"admin",
    // //    role:"admin"
    // },
    user:null,
    loading:true,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        userExist:(state,action)=>{
            state.loading = false,
            state.user = action.payload
        },
        userNotExist:(state,action)=>{
            state.loading = true,
            state.user = null
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('token')
            localStorage.removeItem('isAuthenticated')
        }
    }
})
export const {userExist,userNotExist} = userSlice.actions;
export const userReducer = userSlice.reducer;