import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import axios from "axios"
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/slice/userSlice';

const Register = () => {
    const url = import.meta.env.VITE_BASE_URL
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPasswords] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();

        axios.post(`${url}/auth/register`, {
            username,
            email,
            password
          }).then(function (response) {
            if(response.data.success){
                localStorage.setItem('token',response.data.token)
                dispatch(userExist(response.data.user))
                toast.success("User Registered");
                navigate('/')
            }
          }).catch(function (error) {
            toast.error(error.response.data.message);
            
          });
        
          setUsername('')
          setEmail('')
          setPasswords('')
    }
    
  return (
    <div className='flex  items-center justify-center h-screen'>
    <div className='border p-4 rounded-2xl'>
        <h1 className='mb-3 font-bold'>Register</h1>
    <form className='flex flex-col space-y-2' onSubmit={submitHandler}>
        <input
        required
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        className='border py-1 px-2 rounded-xl' type="text" placeholder='Enter your username' />
        <input
        required
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
        className='border py-1 px-2 rounded-xl' type="email" placeholder='Enter your email' />
        <input
        required
         value={password}
         onChange={(e)=>setPasswords(e.target.value)}
        className='border py-1 px-2 rounded-xl' type="password"  placeholder='Your password'/> 
        <button className='bg-green-600 rounded-xl py-1'>Submit</button>
    </form>
    <div className='text-xs text-center my-2'>
        <p className=''>Already have account?</p>
        <Link className='text-blue-600' to='/login'>Login</Link>
    </div>
    </div>
</div>
  )
}

export default Register