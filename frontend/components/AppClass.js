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
  disable: true
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor() {
    super();
    this.state = initialState;
  }
  
  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const coords = [
      '(1, 1)', '(2, 1)', '(3, 1)',
      '(1, 2)', '(2, 2)', '(3, 2)',
      '(1, 3)', '(2, 3)', '(3, 3)'
    ]
    return coords[this.state.index]
  }
  
  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${this.getXY(this.state.index)}`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState)
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
      if (direction === 'left') {
      if([0,3,6].includes(this.state.index)) {
        return this.state.index
      } else { return this.state.index - 1 } 

    } else if (direction === 'right') {
      if([2,5,8].includes(this.state.index)) {
        return this.state.index
      } else { return this.state.index + 1 }

    } else if (direction === 'up') {
      if([0,1,2].includes(this.state.index)) {
        return this.state.index
      } else { return this.state.index - 3 }

    } else if (direction === 'down') {
      if([6,7,8].includes(this.state.index)) {
        return this.state.index
      } else { return this.state.index + 3 }

    } else if (direction === 'reset') {
      reset()
    }
  }

  getMessage = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'left') {
      if([0,3,6].includes(this.state.index)){
        return "You can't go left"
      }
    } else if (direction === 'right') {
      if([2,5,8].includes(this.state.index)) {
        return "You can't go right"
      }
    } else if (direction === 'up') {
      if([0,1,2].includes(this.state.index)) {
        return "You can't go up"
      }
    } else if (direction === 'down') {
      if([6,7,8].includes(this.state.index)) {
        return "You can't go down"
      }
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.setState({
      ...this.state, 
      steps: this.state.index === this.getNextIndex(evt.target.id)? this.state.steps: this.state.steps + 1, 
      index: this.getNextIndex(evt.target.id), 
      message: this.getMessage(evt.target.id)
    })
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
      if(evt.target.value != ''){
    this.setState({...this.state, disable: false})
    }
    if(evt.target.value === ''){
      this.setState({...this.state, disable: true})
    }
    this.setState({...this.state, email: evt.target.value})
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(`http://localhost:9000/api/result`, {
      'x': this.getXY(this.state.index).substring(1,2), 
      'y': this.getXY(this.state.index).substring(4,5), 
      'steps': this.state.steps,
      'email': this.state.email
    })
      .then(res => {
        this.setState({...this.state, message: res.data.message, email: initialEmail})
      })
      .catch(err => {
        this.setState({...this.state, message: err.response.data.message});
      })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps === 1 ? '': 's'}</h3>
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
        <button id="left" onClick={this.move}>LEFT</button>
        <button id="up" onClick={this.move}>UP</button>
        <button id="right" onClick={this.move}>RIGHT</button>
        <button id="down" onClick={this.move}>DOWN</button>
        <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
