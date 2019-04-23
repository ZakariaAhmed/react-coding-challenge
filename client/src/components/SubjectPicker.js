import React, { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3010'

const SubjectPicker = props => {
  const [subjects, setSubjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(undefined)

  useEffect(() => {
    setIsLoading(true)
    fetch(`${API_URL}/subjects`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)

        return res.json()
      })
      .then(data => {
        setIsLoading(false)
        setSubjects(data)
      })
      .catch(() => {
        setIsError('Failed to fetch')
      })
  }, [])

  let content = <p>Loading subjects...</p>

  if (!isLoading) {
    content = (
      <select
        className='form-control'
        onChange={props.onSubjectSelect}
        value={props.selectedSubject}
      >
        {subjects.map(subject => (
          <option key={subject}>{subject}</option>
        ))}
      </select>
    )
  }

  if (isError) content = <p>{isError}</p>
  return content
}

export default SubjectPicker
