import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';

const MAX_RESUTLS = 5;

class BookSearch extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
     this.setState({query})
     if (query) {
       BooksAPI.search(query, MAX_RESUTLS).then((books) => {
         this.setState({ books })
         console.log(books)
       })
       console.log(query)
     }
  }

  updateBook = (value, book) => {
    book.shelf = value;
    BooksAPI.update(book, book.shelf);
    this.setState({book})
    console.log(value);
    console.log(book);
  }


  render() {
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query && this.state.books.length > 0 ? (
              this.state.books.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onUpdateBook={this.updateBook}
                  />
                </li>
              ))
            ) : (<li>No books</li>)}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
