import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as bookapi from "./BooksAPI.js"

class SearchBooks extends Component {
    state = {
        query: "",
        allBooks: [],
        searchedBooks: []
    }

  refreshBookShelf() {
       bookapi.getAll().then((currentShelfBooks) => {
            this.setState({
              allBooks: currentShelfBooks
            });
          
        })

  }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        this.updateSearch(query)
    }
    updateSearch = (query) => {
      this.refreshBookShelf();
        if (query) {
            bookapi.search(query).then((searchedResults) => {
                if (!(searchedResults.error)) {
                    this.setState(() => ({
                        searchedBooks: searchedResults
                    }))
                }
                else {
                    this.setState({
                        searchedBooks: []
                    })
                }
            })
        }
        else {
            this.setState({
                searchedBooks: []
            })
        }
    }

    updateBookShelf = ((book, shelf) => {
        bookapi.update(book, shelf)
        this.updateSearch(this.state.query)
    })

    render() {
      const booksToShow = this.state.searchedBooks

        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" />
                    <div className="search-books-input-wrapper">
                        <input 
                          type="text" 
                          placeholder="Search by title or author" 
                          value={this.state.query} 
                          onChange={(event) => this.updateQuery(event.target.value)} 
                       />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                {
                  booksToShow.map((book) => {
                    
                    var currentShelf = "none";
                    this.state.allBooks.filter((shelfBook) => shelfBook.id === book.id).map((foundBook) => currentShelf = foundBook.shelf);
                          return ( 
                          <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="bookcoverpage" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}} />
                                    <div className="book-shelf-changer">
                                        <select onChange={(event) => this.updateBookShelf(book, event.target.value)} value={currentShelf}> 
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title"><p>{book.title}</p></div>
                                <div className="authordiv">
                                    <div className="book-authors">
                                        {book.authors}
                                    </div>
                                </div>
                            </div>
                        </li>
                        )


                  })
                }
                    </ol>
                </div>
            </div>)
    }
}
export default SearchBooks