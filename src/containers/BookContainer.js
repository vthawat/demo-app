import React, { useEffect, useReducer } from "react"
import { Link } from "react-router-dom"
import { BOOK_PATH } from "../configs/path"
import { ENDPOINT_URL } from "../configs/url"
import { getBook } from "../states/book/BookDatasource"
import BookReducer from "../states/book/BookReducer"
import { FETCH_SUCCESS, FETCH_FAILED } from "../states/book/BookType"
import moment from "moment";
import noImage from "../assets/img/no-img.png"

const INIT_DATA = {
  ready: false,
  data: [],
  itemsCount: 0,
  error: null
}
export default function BookContainer() {
  const [state, dispatch] = useReducer(BookReducer, INIT_DATA)

  useEffect(() => {
    const getData = async () => {
      const params = { populate: '*' }

      const { result, itemsCount, error } = await getBook(params);

      if (!error) {
        const payload = {
          data: result,
          itemsCount
        }
        return dispatch({ type: FETCH_SUCCESS, payload })
      } else {
        return dispatch({ type: FETCH_FAILED })
      }
    }

    if (!state.ready) {
      setTimeout(() => {
        getData()
      }, 500)
    }
  }, [state])

  return (
    <div className="min-h-screen bg-slate flex justify-center items-center">      
      {
        !state.ready
          ? <div>LOADING...</div>
          : (
            <div className="container">
              <h1 class="font-medium leading-tight text-3xl mt-0 mb-8">รายการหนังสือ</h1>
              <table className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm table-auto">
                <thead className="bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-left"></th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-left">
                      ชื่อหนังสือ
                    </th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-left">
                      ผู้แต่ง
                    </th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-left">
                      ตีพิมพ์เมื่อ
                    </th>
                    <th className="border border-slate-300 p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    state.data.map((item, index) => {
                      const imageUrl = ENDPOINT_URL + item.bookCover.data.attributes.url
                      return (
                        <tr key={index}>
                          <td className="border border-slate-300 p-4">
                            <img 
                              className="object-contain" 
                              style={{width: "80px", height: "100px"}}
                              src={imageUrl} 
                              alt={item.bookTitle} 
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src=noImage
                              }}
                            />
                          </td>
                          <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{item.bookTitle}</td>
                          <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{item.author ? item.author : '-'}</td>
                          <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{item.publishedAt ? moment().format('DD MMMM YYYY', item.publishedAt) : '-'}</td>
                          <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
                            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={BOOK_PATH}>View</Link>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          )
      }
    </div>
  )
}