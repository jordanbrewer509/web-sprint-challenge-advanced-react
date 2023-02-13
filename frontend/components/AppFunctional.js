import React from 'react'
import { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const gridArr = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
const initialCoordinate = {x: 2, y: 2};
let steps = 0;

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [index, setIndex] = useState(initialIndex);
  const [coordinate, setCoordinate] = useState(initialCoordinate)
  const [message, setMessage] = useState(initialMessage)

  function getXY(index) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    for(let i = 0; i < gridArr.length; i++) {
      for(let j = 0; j < gridArr.length; j++) {
        if(gridArr[i][j] === index) {
          coordinate.x = parseInt(coordinate.x + [i + 1]);
          coordinate.y = parseInt(coordinate.y + [j + 1]);
          return coordinate;
        }
        }
      }
    }

  function getIndex(coordinate) {
    // I will use setIndex at the end of this function
    // To allow me to swap the B around
    if(coordinate.x === 1 && coordinate.y === 1) {
      return setIndex(0)
    } else if(coordinate.x === 2 && coordinate.y === 1) {
      return setIndex(1)
    } else if(coordinate.x === 3 && coordinate.y === 1) {
      return setIndex(2)
    } else if(coordinate.x === 1 && coordinate.y === 2) {
      return setIndex(3)
    } else if(coordinate.x === 2 && coordinate.y === 2) {
      return setIndex(4)
    } else if(coordinate.x === 3 && coordinate.y === 2) {
      return setIndex(5)
    } else if(coordinate.x === 1 && coordinate.y === 3) {
      return setIndex(6)
    } else if(coordinate.x === 2 && coordinate.y === 3) {
      return setIndex(7)
    } else if(coordinate.x === 3 && coordinate.y === 3) {
      return setIndex(8)
    }
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setCoordinate({x: 2, y: 2});
    setIndex(4);
    steps = 0;
    setMessage(initialMessage);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === "up" && coordinate.y > 0) {
      if(coordinate.y <= 1) {
        return setMessage("You can't go any higher up");
      }
      steps++;
      coordinate.y = coordinate.y - 1;
      getIndex(coordinate)
      return coordinate;
    } else if(direction === "down") {
      if(coordinate.y >= 3) {
        return setMessage("You can't go any further down");
      }
      steps++;
      coordinate.y = coordinate.y + 1;
      getIndex(coordinate)
      return coordinate;
    } else if(direction === "left") {
        if(coordinate.x <= 1) {
          return setMessage("You can't go farther left");
        }
      steps++;
      coordinate.x = coordinate.x - 1;
      getIndex(coordinate)
      return coordinate;
    } else if(direction === "right") {
        if(coordinate.x >= 3) {
          return setMessage("You can't go farther right");
        }
      steps++;
      coordinate.x = coordinate.x + 1;
      getIndex(coordinate)
      return coordinate;
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    getNextIndex(evt.target.id)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinate ${coordinate.x}, ${coordinate.y}`}</h3>
        <h3 id="steps">{`You moved ${steps} times`}</h3>
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
        <button id="left" onClick={onChange}>LEFT</button>
        <button id="up" onClick={onChange}>UP</button>
        <button id="right" onClick={onChange}>RIGHT</button>
        <button id="down" onClick={onChange}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
