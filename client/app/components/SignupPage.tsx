import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { startSignup } from '../actions/auth'

// TODO: FINISH GTAV CHEAT CODE CHECK. IT ENABLES YOU TO CONTINUE ADDING
// WRONG LETTERS ON I THINK > AND < CHARACTERS. MAYBE OTHERS...

interface ClassProps extends RouteComponentProps<any> {
  startSignup(data: {}): any
}

interface ClassState {
  username: string
  email: string
  password: string
  cheat: any
  admin: boolean
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
    cheat: [],
    admin: false,
    errors: {
      username: '',
      email: '',
      password: '',
      global: ''
    }
  }

  promiseState = async state =>
    new Promise(resolve => this.setState(state, resolve))

  // promiseState({...})
  //     .then(() => promiseState({...})
  //     .then(() => {
  //         ...  // other code
  //         return promiseState({...});
  //     })
  //     .then(() => {...});

  // accessibility
  listenKeyboard = e => {
    const code = ['>', 'a', '>', '<', '>', 'rb', '>', '<', 'a', 'y']
    const { cheat: command } = this.state

    // this.setState(prevState => ({ cheat: [...prevState.cheat, 'a'] }))
    // console.log('check: ', this.state.cheat)
    // console.log('your keycode, key, and value: ', e.keyCode, e.key, e.value)
    switch (e.keyCode || e.key) {
      case 37:
        if (command[2] === '>' || command[6] === '>')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, '<']
          })).then(() => test())
        else this.promiseState({ cheat: [] })
        break
      case 39:
        if (
          command.length === 0 ||
          command[1] === 'a' ||
          command[3] === '<' ||
          command[5] === 'rb'
        )
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, '>']
          })).then(() => test())
        else this.promiseState({ cheat: [] }).then(() => test())
        break
      case 9:
      case 'Tab':
        if (command[4] === '>')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, 'rb']
          })).then(() => test())
        else this.promiseState({ cheat: [] }).then(() => test())
        break
      case 65:
      case 'a':
        if (command[0] === '>' || command[7] === '<')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, 'a']
          })).then(() => test())
        else this.promiseState({ cheat: [] }).then(() => test())
        break
      case 89:
      case 'y':
        if (command[8] === 'a')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, 'y']
          })).then(() => test())
        else this.promiseState({ cheat: [] }).then(() => test())
        break
      default:
        this.promiseState({ cheat: [] }).then(() => test())
    }
    if (this.state.cheat.length > 10) this.promiseState({ cheat: [] })
    const test = () => {
      if (this.state.cheat.join(',') === code.join(',')) {
        this.promiseState({ admin: true })
        window.removeEventListener('keydown', this.listenKeyboard, true)
        alert('cheat code active')
      }
    }
    // if (e.key === 'Escape' || e.keyCode === 27) {
    //   this.props.onClose()
    // }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.listenKeyboard, true)
  }

  // prevent memory leaks
  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenKeyboard, true)
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
        <form
          autoComplete="off"
          className="form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <label htmlFor="email" className="title">
              email
            </label>
            <input type="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="fullname" className="title">
              full name
            </label>
            <input type="text" name="fullname" />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="title">
              username
            </label>
            <input type="text" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="title">
              password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
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
        <div className="signup-overlay" />
        <div className="signup-bg" />
      </div>
    )
  }
}

export default connect(
  undefined,
  { startSignup }
)(SignupPage)
