import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <p><b>total of {sum} exercises</b></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
          <Part key={part.id} part={part}/>)}
        <Total course={course}/>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
      <Header course={course} />
      <Content course={course} />
      </div>
    )
  }

export default Course