import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

const bookShelf = [
  {
    "id": "currentlyReading",
    "title": "Currently Reading",
  },
  {
    "id": "wantToRead",
    "title": "Want to Read",
  },
  {
    "id": "read",
    "title": "Read",
  },
];

class BookLibrary extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (event, book) => {
    book.shelf = event.target.value;
    BooksAPI.update(book, book.shelf);
    this.setState({book})
    console.log(event.target.value);
    console.log(book);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelf.map(shelf => (
              <div key={shelf.id} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books.filter(book => book.shelf === shelf.id).map(book => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          onUpdateBook={this.updateBook}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <a>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookLibrary
