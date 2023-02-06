import React from 'react'
import { useAuth } from "../states/auth/AuthContext"
import { Navigate } from "react-router-dom"
import { BASE_PATH } from "../configs/path"

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth()  

  if (!loggedIn) {
    return <Navigate to={BASE_PATH} />
  }
    
  return children
}