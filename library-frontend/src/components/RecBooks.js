import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, BOOKS_OF_GENRE } from '../queries'

const RecBooks = ({ show, user }) => {
  //should refetch on login instead
  const [getMe, result] = useLazyQuery(ME, {fetchPolicy: "network-only"})
  const [getBooks, theBooks] = useLazyQuery(BOOKS_OF_GENRE)
  const [books, setBooks] = useState([])

  useEffect(() => {
    getMe()
  },[user])


  useEffect(() => {
    if (result.data && (result.data.me !== null)) {
      console.log(result.data)
      getBooks({variables: { genre: result.data.me.favoriteGenre}})
    }
  }, [result.data])

  useEffect(() => {
    if (theBooks.data){
      setBooks(theBooks.data.allBooks)
    }
  },[theBooks])

  if (!show || result.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecBooks