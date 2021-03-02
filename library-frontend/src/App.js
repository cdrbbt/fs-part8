
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)



  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  const userButton = user
    ? <>
    <button onClick={() => setPage('add')}>add book</button>
    <button onClick={ logout }>logout</button>
   </>
    : <button onClick={() => setPage('login')}>login</button>



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {userButton}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setUser={setUser}
      />

    </div>
  )
}

export default App