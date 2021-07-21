import React, { useEffect, useState } from 'react'
import numberService from './services/numbers'

const Filter = ({ nameFilter, handleFilterChange }) => (
  <div>filter shown with <input value={nameFilter} onChange={handleFilterChange} /></div>
)

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, removePerson }) => <tr><td>{person.name}</td><td>{person.number}</td><td><Button handleClick={removePerson} text="delete" person={person}/></td></tr>

const Persons = ({ persons, nameFilter, removePerson }) => {
  const showPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <table>
      <tbody>
        {showPersons.map((person) => <Person key={person.name} person={person} removePerson={removePerson} />)}
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text, person }) => (
  <button onClick={handleClick} value={person.id}>
    {text}
  </button>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const removePerson = (event) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === Number(event.target.value)).name}`)){
    numberService
      .removePerson(event.target.value)
      .then(() => {
        setPersons(persons.filter(p => p.id !== Number(event.target.value)))
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }
    if (!persons.map(person => person.name).includes(newName)) {

      numberService
        .addPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => console.log("ERROR"))
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const id = persons.find(person => person.name === newPerson.name).id

        numberService
          .update(id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`Updated ${newPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }
    }
  }

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <ErrorMessage message={errorMessage}/>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} removePerson={removePerson} />
    </div>
  )
}

export default App