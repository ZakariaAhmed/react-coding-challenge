import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import BookForm from './BookForm'

const BooksList = props => {
  const [editBook, setEditBook] = useState({})

  const [selectedValue, setSelectedValue] = useState(undefined)

  const [isSelected, setIsSelected] = useState(false)

  const fetchBookData = bookId => {
    if (selectedValue) {
      fetch(`http://localhost:3010/books/${bookId}`)
        .then(res => res.json())
        .then(data => {
          setIsSelected(true)
          setEditBook(data)
        })
    }
  }

  useEffect(
    () => {
      fetchBookData(selectedValue)
    },
    [selectedValue]
  )

  let content = <div>Loading</div>
  if (!props.isLoading) {
    content = (
      <div className='book-container'>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.authors[0].name}</td>
                <td>
                  <Button
                    id={book.id}
                    onClick={e => setSelectedValue(e.currentTarget.id)}
                    color='primary'
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <BookForm
          book={editBook}
          isSelected={isSelected}
          callBack={() => {
            props.updateTable()
            setIsSelected(false)
            setSelectedValue(undefined)
          }}
        />
      </div>
    )
  }
  return content
}

export default BooksList
