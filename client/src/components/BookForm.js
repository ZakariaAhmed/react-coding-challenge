import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'
import './BookForm.css'

const API_URL = 'http://localhost:3010'

const BookForm = props => {
  const [bookTitle, setBookTitle] = useState('')
  const [bookAuthors, setBookAuthors] = useState([])

  useEffect(
    () => {
      if (props.book.authors) {
        setBookTitle(props.book.title)
        setBookAuthors(props.book.authors)
      }
    },
    [props.book]
  )

  const handleSubmit = event => {
    event.preventDefault()
    const book = { ...props.book, title: bookTitle, authors: bookAuthors }
    fetch(`${API_URL}/books/${props.book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(() => props.callBack())
  }

  let content = <div className='form-container'>No books selected</div>

  if (props.isSelected) {
    const authors = bookAuthors
      ? bookAuthors.map((author, i) => (
        <FormGroup key={author.birth_year.toString()}>
          <Label for='bookTitle'>Author: </Label>
          <Input
            type='text'
            id='authorName'
            value={author.name}
            onChange={e => {
              const authorArr = [...authors]
              authorArr[i] = { ...author, name: e.target.value }
              setBookAuthors(authorArr)
            }}
          />
        </FormGroup>
      ))
      : null
    content = (
      <div className='form-container'>
        <Form onSubmit={handleSubmit}>
          <Col>
            <FormGroup>
              <Label for='bookTitle'>Title: </Label>
              <Input
                id='bookTitle'
                name='bookTitle'
                value={bookTitle}
                onChange={event => {
                  setBookTitle(event.target.value)
                }}
              />
            </FormGroup>
          </Col>
          <Col>{authors}</Col>
          <Col>
            <Button color='success'>Save</Button>
          </Col>
        </Form>
      </div>
    )
  }
  return content
}

export default BookForm
