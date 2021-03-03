import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOKS_OF_GENRE, BOOK_ADDED } from '../queries'

const Books = (props) => {
  const allBooks = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)
  const [books, setBooks] = useState([])
  const [fetchGenre, filteredResult] = useLazyQuery(BOOKS_OF_GENRE, {fetchPolicy: "network-only"})
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`new book ${subscriptionData.data.bookAdded.title}`)
    }
  })

  useEffect(() => {
    fetchGenre({ 
      variables: { genre: filter },
    })
  }, [filter])

  useEffect(() => {
    if (filteredResult.data) setBooks(filteredResult.data.allBooks)
  }, [filteredResult])

  if (!props.show || allBooks.loading) {
    return null
  }

  const fullBooks = allBooks.data.allBooks

  //ideally the backend would be able to provide a list, this would avoid the awkward fetch all query
  let genres = []

  fullBooks.map(b => b.genres).flat().forEach(g => {
    if (!genres.includes(g)) genres.push(g)
  });

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
          {books.map(a =>
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