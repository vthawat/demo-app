import React, { useMemo, useContext, useReducer, useEffect } from 'react'
import AuthReducer from './AuthReducer'
import { authenticateUser, checkLoggedIn } from "./AuthDataSource"
import { AUTH_ERROR, AUTH_FAILED, AUTH_RESET, AUTH_SUCCESS } from "./AuthType";
import { JWT_TOKEN } from "../../configs/constant"

const INIT_AUTH_USER = {
  jwt: null,
  user: null
}
const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INIT_AUTH_USER)

  useEffect(() => {
    const loggedIn = checkLoggedIn();    
    if (loggedIn) {
      dispatch({ type: AUTH_SUCCESS })
    }
  }, []);

  const login = async (username, password) => {
    const { success, data, error } = await authenticateUser(username, password)

    try {
      if (success) {
        localStorage.setItem(JWT_TOKEN, data.jwt)
        return dispatch({ type: AUTH_SUCCESS, payload: { data: data } })
      } else {
        if (error) {
          return dispatch({ type: AUTH_ERROR, payload: { error: error } })
        } else {
          return dispatch({ type: AUTH_FAILED })
        }
      }
    } catch (e) {
      return dispatch({ type: AUTH_FAILED })
    }
  }

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN)
    return dispatch({ type: AUTH_RESET })
  }

  const reset = () => {
    return dispatch({ type: AUTH_RESET })
  }

  const authData = state.authData
  const loggedIn = state.loggedIn
  const error = state.error

  const authDataValue = useMemo(() => ({ authData, loggedIn, error }),
    [authData, loggedIn, error])
  const values = { ...authDataValue, login, logout, reset }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
const AuthConsumer = () => <AuthContext.Consumer />

export {
  AuthProvider,
  AuthConsumer,
  useAuth
}
export default AuthContext