import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {EDIT_BORN, ALL_AUTHORS} from '../queries'

const SetYearForm = ({ authors }) => {

  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')
  const [setYear] = useMutation(EDIT_BORN,{
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const switchAuthor = (event) => {
    setName(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault()

    const updatedAuthor = {name, year: parseInt(born)}
    setYear({variables: updatedAuthor})
  }

  return (
    <form onSubmit={submit}>
      <div>
        name
        <select value={name} onChange={switchAuthor}>
          {authors.map(a => <option value={a.name} key={a.id}>{a.name}</option>)}
        </select>
      </div>
      <div>
        born
        <input value={born} type='number' onChange={({ target }) => setBorn(target.value)}/>
      </div>
      <button type="submit">add year</button>
    </form>
  )
}

export default SetYearForm