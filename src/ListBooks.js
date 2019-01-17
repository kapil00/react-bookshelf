import React from 'react'
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as booksapi from "./BooksAPI.js";

class ListBooks extends React.Component {
  
    state = {
      allBooks: []
    }

   updateBookShelf = ((book, shelf) => {
        booksapi.update(book, shelf);
    })
  componentDidMount() {
    this.refreshBookShelf();
  }

  componentDidUpdate() {
    this.refreshBookShelf();
  }
  refreshBookShelf() {
        booksapi.getAll().then((currentShelfBooks) => {
            this.setState({
              allBooks: currentShelfBooks
            });
          
        })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookShelf shelfType="currentlyReading" allBooks={this.state.allBooks} onUpdateBookShelf={this.updateBookShelf}/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>

              <BookShelf shelfType="wantToRead"  allBooks={this.state.allBooks} onUpdateBookShelf={this.updateBookShelf}/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookShelf shelfType="read"  allBooks={this.state.allBooks} onUpdateBookShelf={this.updateBookShelf}/>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a Book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks