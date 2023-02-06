import { 
  AUTH_SUCCESS, 
  AUTH_FAILED,
  AUTH_ERROR,
  NO_AUTHORIZE,
  TOKEN_EXPIRED,
  AUTH_RESET
} from "./AuthType"

const AuthReducer = (state, action) => {
  switch (action.type) {    
    case AUTH_SUCCESS:
      return {
        loggedIn: true,
        authData: action.payload && action.payload.data,        
        error: null
      }
    case AUTH_FAILED:
      return {
        loggedIn: false,        
        authData: null,
        error: "Invalid username/password"
      }
    case AUTH_ERROR:
      return {
        loggedIn: false,
        authData: null,
        error: action.payload.error
      }
    case NO_AUTHORIZE:
      return {
        loggedIn: false,
        error: "No authorize"
      }
    case TOKEN_EXPIRED:
      return {
        loggedIn: false,
        error: "token expired"
      }
    case AUTH_RESET:
      return {
        loggedIn: false,
        authData: null,
        error: null,        
      }
    default:
      return state;
  }
}
export default AuthReducer