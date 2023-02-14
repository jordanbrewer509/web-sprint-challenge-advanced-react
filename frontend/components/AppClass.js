import React from 'react';
import { useState } from 'react';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  coordinate: {x: 2, y: 2}
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor() {
    super();
    this.message = initialState.message;
    this.email = initialState.email;
    this.steps = initialState.steps
    this.coordinate = initialState.coordinate;
    this.active = '';
    this.state = {index: initialState.index}
    }
  
  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getIndex = () => {
    const coordinate = this.coordinate;
    if(coordinate.x === 1 && coordinate.y === 1) {
      return this.setState({index: 0})
    } else if(coordinate.x === 2 && coordinate.y === 1) {
        return this.setState({index: 1})
    } else if(coordinate.x === 3 && coordinate.y === 1) {
        return this.setState({index: 2})
    } else if(coordinate.x === 1 && coordinate.y === 2) {
        return this.setState({index: 3})
    } else if(coordinate.x === 2 && coordinate.y === 2) {
        return this.setState({index: 4})
    } else if(coordinate.x === 3 && coordinate.y === 2) {
        return this.setState({index: 5})
    } else if(coordinate.x === 1 && coordinate.y === 3) {
        return this.setState({index: 6})
    } else if(coordinate.x === 2 && coordinate.y === 3) {
        return this.setState({index: 7})
    } else if(coordinate.x === 3 && coordinate.y === 3) {
        return this.setState({index: 8})
    }
  }
  

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const coordinate = this.coordinate;
        if(direction === "up" && coordinate.y > 0) {
      if(coordinate.y <= 1) {
        return this.message = "You can't go any higher up";
      }
      this.steps++;
      coordinate.y = coordinate.y - 1;
      this.getIndex(coordinate)
      return coordinate;
    } else if(direction === "down") {
      if(coordinate.y >= 3) {
        return this.message = "You can't go any further down";
      }
      this.steps++;
      coordinate.y = coordinate.y + 1;
      this.getIndex(coordinate)
      return coordinate;
    } else if(direction === "left") {
        if(coordinate.x <= 1) {
          return this.message = "You can't go farther left";
        }
      this.steps++;
      coordinate.x = coordinate.x - 1;
      this.getIndex(coordinate)
      return coordinate;
    } else if(direction === "right") {
        if(coordinate.x >= 3) {
          return this.message = "You can't go farther right";
        }
      this.steps++;
      coordinate.x = coordinate.x + 1;
      this.getIndex(coordinate)
      return coordinate;
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    
    this.getNextIndex(evt.target.id)
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.coordinate.x}, ${this.coordinate.y})`}</h3>
          <h3 id="steps">{`You moved ${this.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
        <button id="left" onClick={this.onChange}>LEFT</button>
        <button id="up" onClick={this.onChange}>UP</button>
        <button id="right" onClick={this.onChange}>RIGHT</button>
        <button id="down" onClick={this.onChange}>DOWN</button>
        <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
