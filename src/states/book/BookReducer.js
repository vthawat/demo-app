import {
  FETCH_SUCCESS,
  FETCH_FAILED,
} from "./BookType"

const BookReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ready: true,
        itemsCount: action.payload.itemsCount,
        data: action.payload.data        
      }
    case FETCH_FAILED:
      return {
        ready: true,
        itemsCount: 0,
        data: [],
        error: action.error
      }  
    default:
      return state
  }
}
export default BookReducer