import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const removePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}

const exports = { addPerson, removePerson, getAll, update }
export default exports