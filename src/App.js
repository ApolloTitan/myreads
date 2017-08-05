import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookLibrary from './BookLibrary'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {


  render() {
    return (
      <div className="app">
        <Route exact path='/' component={BookLibrary} />
        <Route path='/search' component={BookSearch} />
      </div>
    )
  }
}

export default BooksApp
