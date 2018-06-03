import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { startSignup } from '../actions/auth'

interface ClassProps extends RouteComponentProps<any> {
  startSignup(data: {}): any
}

interface ClassState {
  username: string
  email: string
  password: string
  errors: {
    username: string
    email: string
    password: string
  }
}

export class SignupPage extends Component<ClassProps, ClassState> {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
      global: ''
    }
  }

  onFieldChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    } as any)
  }

  // startSignup will also have dispatch with it
  onSubmit = e => {
    e.preventDefault()
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    // passed down from connect
    this.props
      .startSignup(data)
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { errors } = this.state
    return (
      <div className="signup-page">
        <Link to="/" className="seam">
          Seam
        </Link>
        <form
          className="auth-form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          <h2 className="header">Sign Up</h2>
          <div className="input-group">
            <label htmlFor="username" className="title">
              username
            </label>
            <input type="text" name="username" />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="title">
              email
            </label>
            <input type="email" name="email" />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="title">
              password
            </label>
            <input type="password" name="password" />
          </div>
          <div className="input-group">
            <button type="submit" className="submit">
              Signup
            </button>
          </div>
          <div className="other-page">
            <p className="text">Already have an account?</p>
            <Link to="/login" className="link">
              &nbsp;Login
            </Link>
          </div>
        </form>
        {errors.global && <p>{errors.global}</p>}
        <div className="overlay" />
        <div className="bg" />
      </div>
    )
  }
}

export default connect(undefined, { startSignup })(SignupPage)
