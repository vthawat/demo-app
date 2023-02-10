import React, { useRef, useState } from "react"
import { useAuth } from "../states/auth/AuthContext"
import { Navigate } from "react-router-dom"
import { BOOK_PATH } from "../configs/path"
import mainLogo from "../assets/img/main-logo.png"

export default function AuthenContainer() {
  const { loggedIn, login, reset, error } = useAuth()
  const [processing, setProcessing] = useState(false)
  const refEmail = useRef()
  const refPassword = useRef()

  const _handleSubmitLogin = async (e) => {
    e.preventDefault()

    const email = refEmail.current.value
    const password = refPassword.current.value

    setProcessing(true)
    await login(email, password)

    setProcessing(false)
  }

  const _handleInputFocus = () => {
    reset()
  }

  return (
    <>
      {
        loggedIn ? <Navigate to={BOOK_PATH} />
          : (
            <div className="min-h-screen bg-purple-600 flex justify-center items-center">
              <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
              </div>
              <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-1 -right-2 transform rotate-12 hidden md:block">
              </div>
              <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>
                  <img src={mainLogo} alt="strapi workshop" style={{ height: "80px"}} className="object-fit" />
                  <p className="w-80 text-center text-sm mb-8 mt-2 font-semibold text-gray-700 tracking-wide cursor-pointer">WUNCA#42 Workshop</p>
                </div>
                <form onSubmit={_handleSubmitLogin}>
                  <div className="space-y-4">
                    <input type="text" ref={refEmail} placeholder="Email Address" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" onFocus={_handleInputFocus} />
                    <input type="password" ref={refPassword} placeholder="Password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" onFocus={_handleInputFocus} />
                  </div>
                  {
                    error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error.message}</span>
                      </div>
                    )
                  }
                  <div className="text-center mt-6">
                    <button className="py-3 w-64 text-md text-white bg-purple-600 rounded-2xl" disabled={processing}>
                      {
                        processing ? (
                          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                          </svg>
                        ) : (
                          <span>LOGIN</span>
                        )
                      }
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
              <div
                className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
              </div>
            </div>
          )
      }
    </>
  )
}