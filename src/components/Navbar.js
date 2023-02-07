import React from 'react'
import { BASE_PATH } from '../configs/path'
import logo from '../assets/img/logo.png';
import { useAuth } from '../states/auth/AuthContext';

export default function Navbar() {
  const { logout } = useAuth()

  const _handleLogout = () => {
    logout()
  }

  return (
    <nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-2">
        <a href={BASE_PATH} className="flex items-center">
          <img src={logo} className="h-4 mr-3 sm:h-8" alt="Strapi Logo" />          
        </a>       
        <div className="flex md:order-2">
          <button className="text-red-600 hover:text-white border border-red-600 hover:bg-red-500 rounded-2xl py-1 px-5" onClick={_handleLogout}>LOGOUT</button>
        </div>
      </div>
    </nav>
  )
}