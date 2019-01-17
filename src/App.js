import React from 'react'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'
import { Route } from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={ListBooks} />
        <Route path='/search' component={SearchBooks} />
     </div>
      )
  }

}

export default App
