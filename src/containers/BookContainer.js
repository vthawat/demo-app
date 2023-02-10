import React, { useEffect, useReducer } from "react"
import { Link } from "react-router-dom"
import { BOOK_PATH } from "../configs/path"
import { ENDPOINT_URL } from "../configs/url"
import { getBook } from "../states/book/BookDatasource"
import BookReducer from "../states/book/BookReducer"
import { FETCH_SUCCESS, FETCH_FAILED } from "../states/book/BookType"
import moment from "moment";
import noImage from "../assets/img/no-img.png"
import Navbar from "../components/Navbar"

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
    <>
      <Navbar />
      <div className="min-h-screen bg-slate flex justify-center items-center">
        {
          !state.ready
            ? (
              <div className="text-center" role="status">
                <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <p className="mt-3">LOADING...</p>
              </div>
            ) : (
              <>
                {
                  state.data.length <= 0 ? (
                    <div role="status">
                      <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p>NO DATA</p>
                    </div>
                  ) : (
                    <div className="container">
                      <h1 className="font-medium leading-tight text-3xl mt-0 mb-8">รายการหนังสือ</h1>
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

                              let imageUrl
                              if (item.bookCover.data !== null) {
                                imageUrl = ENDPOINT_URL + item.bookCover.data.attributes.url                                
                              } else {
                                imageUrl = noImage
                              }
                              return (
                                <tr key={index}>
                                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                    <img
                                      className="object-cover"
                                      style={{ height: "120px", width: 'auto', margin: '0 auto' }}
                                      src={imageUrl}
                                      alt={item.bookTitle}
                                      onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = noImage
                                      }}
                                    />
                                  </td>
                                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{item.bookTitle}</td>
                                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{item.author ? item.author : '-'}</td>
                                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{item.publishedAt ? moment().format('DD MMMM YYYY', item.publishedAt) : '-'}</td>
                                  <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
                                    <Link className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded" to={BOOK_PATH + '/' + item.id}>View</Link>
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
              </>
            )
        }
      </div>
    </>
  )
}