import React from 'react'
import './App.css'

class BookShelf extends React.Component {
    render() {
      const { allBooks, shelfType, onUpdateBookShelf } = this.props

        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {allBooks.filter(book => book.shelf === shelfType).map(book => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="bookcoverpage" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }} />
                                    <div className="book-shelf-changer">
                                        <select onChange={(event) => onUpdateBookShelf(book, event.target.value)} value={book.shelf}> 
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
                    ))}
                </ol>
            </div>

        );

    }
}

export default BookShelf