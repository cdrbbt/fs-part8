import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      id
      born
      bookCount
    }
  } 
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      author{
        name
      }
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
    ){
      title
    }
}
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $year: Int!){
    editAuthor(name: $name, setBornTo: $year){
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password:String!){
    login(username: $username, password: $password){
      value
    }
  }
`