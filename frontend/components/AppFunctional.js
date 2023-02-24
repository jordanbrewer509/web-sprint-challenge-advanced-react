import React from 'react';
import { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [index, setIndex]           = useState(initialIndex);
  const [steps, setSteps]           = useState(initialSteps)
  const [message, setMessage]       = useState(initialMessage)
  const [email, setEmail]           = useState(initialEmail)
  const [disable, setDisable]       = useState(true)

  function getXY() {
    // It is not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const coordinates = [
      '(1, 1)', '(2, 1)', '(3, 1)',
      '(1, 2)', '(2, 2)', '(3, 2)',
      '(1, 3)', '(2, 3)', '(3, 3)'
    ]
    return coordinates[index]
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${getXY(index)}`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex)
    setSteps(initialSteps)
    setEmail(initialEmail)
    setMessage(initialMessage)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left') {
      if([0, 3, 6].includes(index)) {
        setMessage("You can't go left")
        return index
      } else {
        setSteps(steps + 1)
        return index - 1
      }
    } else if(direction === 'right') {
      if([2, 5, 8].includes(index)) {
        setMessage("You can't go right")
        return index
      } else {
        setSteps(steps + 1)
        return index + 1
      }
    } else if(direction === 'up') {
      if([0, 1, 2].includes(index)) {
        setMessage("You can't go up")
        return index
      } else {
        setSteps(steps + 1)
        return index - 3
      }
    } else if(direction === 'down') {
      if([6, 7, 8].includes(index)) {
        setMessage("You can't go down")
        return index
      } else {
        setSteps(steps + 1)
        return index + 3
      }
    } else if(direction === 'reset') {
      reset()
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setIndex(getNextIndex(evt.target.id))
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    if(evt.target.value != ''){
      setDisable(false)
    }
    if(evt.target.value === ''){
      setDisable(true)
    }
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(`http://localhost:9000/api/result`, {
      'x': getXY(index).substring(1, 2),
      'y': getXY(index).substring(4, 5),
      'steps': steps,
      'email': email
    })
      .then(res => {
        setMessage(res.data.message)
        setEmail(initialEmail)
      })
      .catch(err => setMessage(err.response.data.message))
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} time{steps === 1 ? '' : 's'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
      <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
      <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
