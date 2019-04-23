import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import SubjectPicker from './components/SubjectPicker'
import BooksList from './components/BooksList'

const App = () => {
  const [subject, setSubject] = useState('Fiction')
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const subjectHandler = event => {
    setSubject(event.target.value)
  }

  const fetchSubject = chosenSubject => {
    fetch(`http://localhost:3010/books?subjects_like=${chosenSubject}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch.')

        return res.json()
      })
      .then(data => {
        setIsLoading(false)
        setBooks(data)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    fetchSubject(subject)
  }, subject)

  const content = (
    <Container>
      <h1 className='text-center'>The BookApp</h1>
      <Row>
        <Col md='3'>
          <SubjectPicker
            onSubjectSelect={subjectHandler}
            selectedSubject={subject}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <BooksList
            updateTable={() => {
              fetchSubject(subject)
            }}
            books={books}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </Container>
  )
  return content
}

export default App
