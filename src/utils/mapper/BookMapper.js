export default function bookMapper(data={}) {
  console.log(data)
  return {
    bookTitle: data.book_title ? data.book_title : null,
    bookCover: data.book_cover ? data.book_cover : null,
    bookDesc: data.book_desc ? data.book_desc : null,
    author: data.author ? data.author : null,
    categoryDetail: data.category_detail ? data.category_detail : null,        
    publisher: data.publisher ? data.publisher : null,
    createdAt: data.createdAt ? data.createdAt : null,
    updatedAt: data.updatedAt ? data.updatedAt : null,
    publishedAt: data.publishedAt ? data.publishedAt : null,
  }
}
