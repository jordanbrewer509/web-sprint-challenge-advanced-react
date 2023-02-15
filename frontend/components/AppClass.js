import React from 'react';
import axios from 'axios';

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
    this.steps = initialState.steps
    this.coordinate = initialState.coordinate;
    this.active = '';
    this.state = {message: initialState.message, index: initialState.index, email: initialState.email}
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
  
  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.steps = initialState.steps
    this.coordinate = {x: 2, y: 2}
    this.active = '';
    this.setState({index: 4, message: '', email: ''})
  }

  resetGrid = () => {
    this.steps = initialState.steps
    this.coordinate = {x: 2, y: 2}
    this.setState({index: 4})
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const coordinate = this.coordinate;
      if(direction === "up") {
        if(coordinate.y <= 1) {
          return this.setState({message: "You can't go up"});
        }
        this.setState({message: ''})
        this.steps++;
        coordinate.y = coordinate.y - 1;
        this.getIndex(coordinate)
        return coordinate;
    } 
    else if(direction === "down") {
      if(coordinate.y >= 3) {
        return this.setState({message: "You can't go down"});
      }
      this.setState({message: ''})
      this.steps++;
      coordinate.y = coordinate.y + 1;
      this.getIndex(coordinate)
      return coordinate;
    } 
    else if(direction === "left") {
        if(coordinate.x <= 1) {
          return this.setState({message: "You can't go left"});
        }
      this.setState({message: ''})
      this.steps++;
      coordinate.x = coordinate.x - 1;
      this.getIndex(coordinate)
      return coordinate;
    } 
    else if(direction === "right") {
        if(coordinate.x >= 3) {
          return this.setState({message: "You can't go right"});
        }
      this.setState({message: ''})
      this.steps++;
      coordinate.x = coordinate.x + 1;
      this.getIndex(coordinate)
      return coordinate;
    } 
    else if(direction === "reset") {
      this.reset();
    }
  }

  emailChangeHandler = () => {
    this.setState({email: document.getElementById('email').value})
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.getNextIndex(evt.target.id)
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(`http://localhost:9000/api/result`, {
      'x': this.coordinate.x,
      'y': this.coordinate.y,
      'steps': this.steps,
      'email': this.state.email
    })
      .then(res => {
        this.setState({message: res.data.message})
        // this.resetGrid();
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`(${this.coordinate.x},${this.coordinate.y})`}</h3>
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
        <button id="left" onClick={this.onChange}>LEFT</button>
        <button id="up" onClick={this.onChange}>UP</button>
        <button id="right" onClick={this.onChange}>RIGHT</button>
        <button id="down" onClick={this.onChange}>DOWN</button>
        <button id="reset" onClick={this.onChange}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.emailChangeHandler}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
