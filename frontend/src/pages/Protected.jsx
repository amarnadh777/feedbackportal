import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function Protected({children}) {
    const navigate = useNavigate()
    const  userData = useSelector((state) => state.authReducer.userData);
    const token = localStorage.getItem("token")
   if(!token  )
   {
    return <Navigate to="/login"/>
   }
    return children
  
}

export default Protected