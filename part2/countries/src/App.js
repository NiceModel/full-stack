import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ nameFilter, handleFilterChange }) => (
  <div>filter shown with <input value={nameFilter} onChange={handleFilterChange}/></div>
)

const Country = ({ country, handleClick }) => (
  <tr><td>{country.name}<Button handleClick={handleClick} text="show" country={country} /></td></tr>
)

const CountryDetails = ({ country }) => {
  const [ weather, setWeather] = useState({ main: {temp: 0}, weather: {0: {icon: ".png", description: "placeholder"} }, wind: {speed: 0} })

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
    }, [country.capital])

  return(
  <div>
  <h2>{country.name}</h2>
  <p>capital {country.capital} <br/>
     population {country.population}</p>
  <p><b>languages</b></p>
  <ul>
    {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
  </ul>
  <img src={country.flag} alt="Flag" width="120px"/>
  <h2>Weather in {country.capital}</h2>
  <p><b>temperature: {weather.main.temp.toFixed(1)} Celsius</b></p>
  <p>{weather.weather[0].description}</p>
  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.description}/>
  <p>wind speed {weather.wind.speed.toFixed(1)}</p>
  </div>
  )
}

const Countries = ({ countries, nameFilter, handleClick }) => {

  const showCountries = countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()))

  if (showCountries.length > 10){
    return("Too many matches, specify another filter")
  }

  if (showCountries.length === 1){
    return(<CountryDetails country={showCountries[0]}/>)
  }

  return(
  <table>
    <tbody>
      {showCountries.map((country) => <Country key={country.name} country={country} handleClick={handleClick} />)}
    </tbody>
  </table>
  )
}

const Button = ({ handleClick, text, country }) => (
  <button onClick={handleClick} value={country.name}>
    {text}
  </button>
)

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ nameFilter, setNameFilter ] = useState('')

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleClick = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
      })
    }, [])

  return (
    <div>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} nameFilter={nameFilter} handleClick={handleClick}/>
    </div>
  )
}

export default App