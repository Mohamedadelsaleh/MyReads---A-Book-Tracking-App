import "./App.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as APIs from "./BooksAPI";
import BookShelf from "./Components/BookShelf";

const namedBookshelves = [
  { value: 'currentlyReading', title: 'Currently Reading' },
  { value: 'wantToRead', title: 'Want to Read' },
  { value: 'read', title: 'Read' },
  { value: 'none', title: 'None' },
]

function App (){
  const history = useHistory();
  const [books, setBooks] = useState([]);

  useEffect(()=> {
    APIs.getAll()
    .then(APIBooks => {
      setBooks(APIBooks)
    })
  },[])

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {
                namedBookshelves.map((bookShelve,idx)=>(
                  <BookShelf 
                    key={idx}
                    title={bookShelve.title}
                    books={books.filter((book)=>
                      book.shelf === bookShelve.value
                      )}
                      setBooks={setBooks}
                  />
                ))
              }
            </div>
          </div>
          <div className="open-search">
            <button className="Search"onClick={() => history.push("/search") }>Search for a Book</button>
          </div>
        </div>
    </div>
  );
}

export default App;
