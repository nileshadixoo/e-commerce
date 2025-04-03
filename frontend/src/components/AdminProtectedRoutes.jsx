import React from 'react'
import { Navigate } from 'react-router'

const AdminProtectedRoutes = ({children}) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const isAdmin = localStorage.getItem("isAdmin")
    if(!isAuthenticated){
        return <Navigate to="login"/>
    }
    else if(isAuthenticated && !isAdmin){
        return <Navigate to="/"/>
    }
  return (
    children
  )
}

export default AdminProtectedRoutes