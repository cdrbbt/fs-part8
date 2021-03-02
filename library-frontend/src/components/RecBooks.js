import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, BOOKS_OF_GENRE } from '../queries'

const RecBooks = (props) => {
  const result = useQuery(ME)
  const [getBooks, theBooks] = useLazyQuery(BOOKS_OF_GENRE)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (theBooks.data){
      setBooks(theBooks.data.allBooks)
    }
  },[theBooks])

  useEffect(() => {
    if (result.data) {
      getBooks({variables: { genre: result.data.me.favoriteGenre}})
    }
  }, [result.data])

  if (!props.show || result.loading) {
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