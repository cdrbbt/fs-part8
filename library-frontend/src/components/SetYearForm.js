import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {EDIT_BORN, ALL_AUTHORS} from '../queries'

const SetYearForm = () => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [setYear] = useMutation(EDIT_BORN,{
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const submit = (event) => {
    event.preventDefault()

    const updatedAuthor = {name, year: parseInt(born)}
    setYear({variables: updatedAuthor})
  }

  return (
    <form onSubmit={submit}>
      <div>
        name
        <input value={name} onChange={({ target }) => setName(target.value)}/>
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