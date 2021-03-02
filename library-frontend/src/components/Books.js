import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  let genres = []

  books.map(b => b.genres).flat().forEach(g => {
    if (!genres.includes(g)) genres.push(g)
  });

  const bookFilter = (book) => {
    return filter ? book.genres.includes(filter) : true
  }

  const filterSelect = genres
  .map(g => <button key={g} onClick={() => setFilter(g)}>{g}</button>)
  .concat(<button onClick={() => setFilter(null)} key="clear">clear filter</button>)

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
          {books.filter(bookFilter).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {filterSelect}
    </div>
  )
}

export default Books