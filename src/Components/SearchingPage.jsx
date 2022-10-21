import React, { useEffect, useState } from 'react'
import * as APIs from "../BooksAPI";
import { useHistory } from "react-router-dom";
import Book from './Book';

const SearchingPage = () => {

    const [searchingText, setSearchingText] = useState("");
    const [books, setBooks] = useState([]);
    const history = useHistory();


    const handleSearching = (e) => {
        if(searchingText.length === 0){
            setBooks([]);
        }
        else {
            APIs.search(searchingText)
            .then((books) => {
                if(!books.error) {
                    APIs.getAll()
                    .then(book => {
                        setBooks(handleDefaults(books, book))
                    })
                }
                else {
                    setBooks([])
                }
            })
        }
    }

    const handleDefaults = (searchedBooks, BookNeeded) => {
        return searchedBooks.map(book => {
            for (let i = 0; i < BookNeeded.length; i++) {
                if (BookNeeded[i].id === book.id) {
                    return { ...book, shelf: BookNeeded[i].shelf };
                }
            }
        return { ...book, shelf: "none" };
        });
      };


    useEffect(() => {
            handleSearching()
        },[searchingText]);

    return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button
                        className="close-search"
                        onClick={() =>  history.push("/")}
                    >
                        Close
                    </button>
                    <div className="search-books-input-wrapper">
                        <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(e)=> setSearchingText(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.map((book, idx) => (
                                <Book 
                                    key={idx}
                                    title={book.title}
                                    author={book.author}
                                    imgURL={book.imageLinks && book.imageLinks.thumbnail}
                                    bookShelf={book.shelf}
                                    book={book}
                                    searching
                                />
                            ))
                        }
                    </ol>
                </div>
            </div>
    )
}

export default SearchingPage