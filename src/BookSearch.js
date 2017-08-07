import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';

const MAX_RESUTLS = 5;

class BookSearch extends Component {
  state = {
    query: '',
    books: [],
    searchResults: [],
    libraryBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ libraryBooks: books })
    })
  }

  updateQuery = (query) => {
    let self = this
    let finalResult = []
    this.setState({query})

    if (query) {
      BooksAPI.search(query, MAX_RESUTLS).then((search_books) => {
        if (!search_books.length > 0) {
          return
        } else {
          search_books.forEach(function(sb) {
            let tempBook = sb;
            tempBook.shelf = "none"
            self.state.libraryBooks.forEach(function(lb) {
              if (sb.id === lb.id) {
                tempBook = lb
              }
            })
            finalResult.push(tempBook)
          })
        }
        this.setState({ books: finalResult})
      })
    }
  }

  updateBook = (value, book) => {
    book.shelf = value
    BooksAPI.update(book, book.shelf)
    this.setState({book})
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
                <li key={book.id} className='book-search-item'>
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
