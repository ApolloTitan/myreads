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
    let self = this
    let temp_shelf

     this.setState({query})
     if (query) {
       BooksAPI.search(query, MAX_RESUTLS).then((books) => {
         self.setState({books})
       })


     }
  }


  getShelfInformation = (old_book) => {
    BooksAPI.get(old_book.id).then((book_with_shelf_info) => {
      // this.setState({book_with_shelf_info})
      this.setState((old_book) => ({
        book: book_with_shelf_info
      }));
      console.log("new book: ", this.state.book);
    })
    // this.setState({book})


  }


  updateBook = (value, book) => {
    book.shelf = value;
    BooksAPI.update(book, book.shelf);
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
                    updateShelf={this.getShelfInformation}
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
