import React, { Component } from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import SplashPage from '../components/SplashPage'
import LoginPage from '../components/LoginPage'
import SignupPage from '../components/SignupPage'
import SettingsPage from '../components/SettingsPage'
import DashboardPage from '../components/DashboardPage'

import NotFoundPage from '../components/NotFoundPage'

export const history = createHistory()

interface IPages {
  history?: any
}

export class Pages extends Component<IPages> {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute exact={true} path="/" component={SplashPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/signup" component={SignupPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Pages)
