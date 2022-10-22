import React from 'react'
import * as APIs from "../BooksAPI";

const Book = ({
    imgURL,
    title, 
    authors, 
    book, 
    setBooks, 
    searching, 
    bookShelf}) => {
    
    const handleBookStatus = (e) => {
        if(e.target.value !== "move") {
            APIs.update(
                book, 
                e.target.value
            )
            .then((res)=> {
                APIs.getAll()
                .then(addBook => {
                    setBooks(addBook)
                })
            })
        }
    }

    const handleBookSearching = (e) => {
        if(e.target.value !== "move") {
            APIs.update(
                book, 
                e.target.value
            )
        }
    }

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${imgURL}")`
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select
                        onChange = {(e)=>{
                            if(searching) {
                                handleBookSearching(e);
                            }
                            else{
                                handleBookStatus(e)
                            }
                        }
                    }
                    value={book.shelf}
                    >
                    <option value="move" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">
                        Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.map(author => `${author},`)}</div>
    </div>
    )
}

export default Book