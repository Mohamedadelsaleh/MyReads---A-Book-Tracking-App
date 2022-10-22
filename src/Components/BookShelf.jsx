import React from 'react'
import Book from './Book'

const BookShelf = ({ 
    books, 
    title, 
    setBooks }) => {
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book, idx) =>(
            <li key={idx}>
                <Book 
                    title={book.title}
                    authors={book.authors}
                    imgURL={book.imageLinks && book.imageLinks.thumbnail}
                    bookShelf={book.bookShelf}
                    book={book}
                    setBooks={setBooks}
                />
            </li>
        ))}
      </ol>
    </div>
  </div>
  )
}

export default BookShelf