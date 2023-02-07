import { JWT_TOKEN } from "../../configs/constant"
import { AUTH_ENDPOINT } from "../../configs/url"

function checkLoggedIn() {
  const token = localStorage.getItem(JWT_TOKEN)

  return token ? true : false
}

async function authenticateUser(username, password) {
  let rSuccess = false, rData, rMessage, rError

  await fetch(AUTH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      identifier: username,
      password
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json()
    } else {
      rError = {
        code: res.status,
        message: res.statusText
      }
    }
  }).then(data => {    
    rSuccess = true
    rData = data
    rMessage = 'login successed'
  }).catch(e => {
    rError = {
      code: 503,
      message: 'Cannot connect to server'
    }
  })

  return { 
    success: rSuccess, 
    data: rData, 
    message: rMessage, 
    error: rError 
  }
}

export {
  checkLoggedIn,
  authenticateUser
}