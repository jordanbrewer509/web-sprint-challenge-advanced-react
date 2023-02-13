import React from 'react'
import { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const gridArr = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
let coordinate = {x: 2, y: 2};

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [index, setIndex] = useState(initialIndex);

  function getXY(index) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    for(let i = 0; i < gridArr.length; i++) {
      for(let j = 0; j < gridArr.length; j++) {
        if(gridArr[i][j] === index) {
          coordinate.x = parseInt(coordinate.x + [i + 1]);
          coordinate.y = parseInt(coordinate.y + [i + 1]);
          return coordinate;
        }
        }
      }
    }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    if((coordinate.x + 1) > 3) {
      return "You can't go farther right";
    } else if((coordinate.x - 1) < 0) {
      return "You can't go farther left";
    } else if((coordinate.y + 1) > 3) {
      return "You can't go any further down";
    } else if((coordinate.y - 1) < 0) {
      return "You can't go any higher up";
    } 
  }

  function getIndex() {
    // I will set setIndex at the end of this function
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
    coordinate.x = 2;
    coordinate.y = 2;
    console.log(coordinate)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === "up" && coordinate.y > 1) {
      coordinate.y = coordinate.y - 1; 
      console.log(coordinate)
      return coordinate;
    } else if(direction === "down" && coordinate.y < 3) {
      coordinate.y = coordinate.y + 1;
      console.log(coordinate)
      return coordinate;
    } else if(direction === "left" && coordinate.x > 1) {
      coordinate.x = coordinate.x - 1;
      console.log(coordinate)
      return coordinate;
    } else if(direction === "right" && coordinate.x < 3) {
      coordinate.x = coordinate.x + 1;
      console.log(coordinate)
      return coordinate;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    
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
        <h3 id="steps">You moved 0 times</h3>
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
        <h3 id="message"></h3>
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
