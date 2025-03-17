import React from 'react'
  import { Navigate } from 'react-router'
const ProtectedRoute = ({children}) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if(isAuthenticated){
        return children
    }
  return (
    <Navigate to='/login'/>
    
  )
}

export default ProtectedRoute