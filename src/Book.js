import React, { Component } from 'react';
import BookAuthors from './BookAuthors';

class Book extends Component {
  render() {
    const { book, onUpdateBook } = this.props


    return (
      <div className="book" >
        <div className="book-detail">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 185, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf}
                onChange={(event) => onUpdateBook(event.target.value, book)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors"><BookAuthors authors={book.authors} /></div>
          {/* <div>{book.shelf}</div>
          <div>{book.id}</div> */}
        </div>
      </div>
    )
  }
}

export default Book
