import React, { useState } from 'react'

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ reviews }) => {
  const [good, neutral, bad, all] = reviews
  if (all.length === 0) return(<div><p>No feedback given</p></div>)

  const average = (all.reduce((x, y) => x + y, 0) / all.length).toFixed(1)
  const positive = (good / all.length * 100).toFixed(1)

  return(
    <table>
      <tbody>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all.length}/>
      <Statistic text="average" value={average}/>
      <Statistic text="positive" value={positive + " %"}/>
      </tbody>
    </table>
  )

}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  const incrementGood = () => {
    setGood(good + 1)
    setAll(all.concat(1))
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all.concat(0))
  }
  const incrementBad = () => {
    setBad(bad + 1)
    setAll(all.concat(-1))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <Statistics reviews={[good, neutral, bad, all]}/>
    </div>
  )
}

export default App