import { BOOK_ENDPOINT } from "../../configs/url";
import BookMapper from "../../utils/mapper/BookMapper";
import querystring from "querystring"
import { JWT_TOKEN } from "../../configs/constant";

async function getBookByID(id, params=null) {
  let result = [], itemsCount = 0, error = null

  const token = localStorage.getItem(JWT_TOKEN)    
  const fetchEndpoint = BOOK_ENDPOINT + '/' + id + (params && '?' + querystring.stringify(params));  

  await fetch(fetchEndpoint, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then(resp => {      
      if (resp.status === 200) {        
        return resp.json()
      } else {        
        error = {
          code: resp.status,
          message: resp.statusText
        }
      }
    })
    .then(resData => {      
      if (resData.data) {        
        result = BookMapper(resData.data.attributes, resData.data.id)
        itemsCount = 1
      } 
    })
    .catch(fetchError => {
      error = fetchError
    });

  return {
    result,
    itemsCount,
    error
  }
}

async function getBook(params) {
  let result = [], itemsCount = 0, error = null

  const token = localStorage.getItem(JWT_TOKEN)    
  const fetchEndpoint = BOOK_ENDPOINT + (params && '?' + querystring.stringify(params));  

  await fetch(fetchEndpoint, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then(resp => {      
      if (resp.status === 200) {        
        return resp.json()
      } else {        
        error = {
          code: resp.status,
          message: resp.statusText
        }
      }
    })
    .then(resData => {    
      if (resData.data.length > 0) {     
        result = resData.data.map(value => {
          return BookMapper(value.attributes, value.id)
        })           
        itemsCount = resData.meta.pagination.total
      } 
    })
    .catch(fetchError => {
      error = fetchError
    });
  return {
    result,
    itemsCount,
    error
  }
}
export {
  getBook,
  getBookByID
}