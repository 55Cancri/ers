import React, { Component } from 'react'
import axios from 'axios'

export class SignupComponent extends Component<any, any> {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    e.preventDefault()
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  sendDataToServer = () => {
    axios.post('/signUp', {
      username: this.state.username,
      password: this.state.password
    })
  }

  // @ts-ignore
  render = () => {
    return (
      <form onSubmit={this.sendDataToServer}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" value={this.state.password} />
        <button type="submit">Submit to Server!</button>
      </form>
    )
  }
}

export default SignupComponent
