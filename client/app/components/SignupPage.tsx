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
    email: '',
    fullname: '',
    username: '',
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
    const personName = this.state.fullname.split(' ')
    const data = {
      email: this.state.email,
      firstname: personName[0],
      lastname: personName[personName.length - 1],
      username: this.state.username,
      password: this.state.password
    }
    console.log('here are your credentials: ', data)

    // passed down from connect
    this.props
      .startSignup(data)
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        console.log('well now we have a problem: ', err)
        this.setState({ errors: err.response.data.errors })
      })
  }

  render() {
    const { errors } = this.state
    return (
      <div className="signup-page">
        <Link to="/" className="seam">
          Revature
        </Link>
        <form
          className="auth-form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          <h2 className="header">Sign Up</h2>
          <div className="input-group">
            <label htmlFor="email" className="title">
              email
            </label>
            <input type="email" name="email" />
          </div>
          <div className="input-group">
            <label htmlFor="fullname" className="title">
              full name
            </label>
            <input type="text" name="fullname" />
          </div>
          <div className="input-group">
            <label htmlFor="username" className="title">
              username
            </label>
            <input type="text" name="username" />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="title">
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
        {!!errors.global && <p>{errors.global}</p>}
        {/* {errors.global && <p>{errors.global}</p>} */}
        <div className="overlay" />
        <div className="bg" />
      </div>
    )
  }
}

export default connect(
  undefined,
  { startSignup }
)(SignupPage)
