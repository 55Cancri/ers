import React, { Component } from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import decode from 'jwt-decode'

import { Pages } from './Routes'

import { login } from '../actions/auth'
import { configureStore } from '../store/configureStore'

const store = configureStore()

// this is where you retrieve data from local storage

// TODO: reconfigure to only send token
if (localStorage.ers) {
  const payload = decode(localStorage.ers)
  const user = {
    token: localStorage.ers,
    email: payload.email,
    username: payload.username,
    photo: payload.photo,
    confirmed: payload.confirmed
  }
  store.dispatch(login(user))
}

export class AppRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Pages />
      </Provider>
    )
  }
}

export default hot(module)(AppRouter)
