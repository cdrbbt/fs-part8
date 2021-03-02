import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [sendLogin, loginResult] = useMutation(LOGIN)
  
  useEffect(() => {
    if (loginResult.data){
      const token = loginResult.data.login.value
      props.setUser(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [loginResult.data])

  if (!props.show ) {
    return null
  }

  const login = (event) => {
    event.preventDefault()
    sendLogin({variables:{ username, password }})
  }

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <div>
      username
        <input value={username} onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
      password
        <input value={password} type="password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
  </form>
  )
}

export default LoginForm