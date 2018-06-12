import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import History from 'history'
import moment from 'moment'
import numeral from 'numeral'
import Spinner from 'react-spinkit'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import ReimbursementList from './dashboard/ReimbursementList'

import { startPersist } from '../actions/auth'

// extend RouteComponentProps to get access to history object
interface IProps extends RouteComponentProps<any> {
  reimbursements: Array<Object>
  identity: {
    username: string
    token: string
  }
}

class DashboardPage extends Component<IProps> {
  // @ts-ignore
  componentDidMount = () =>
    console.log('check: ', typeof this.props.reimbursements)

  // convert any function to asynchronous and return a promise
  makeAsync = async func =>
    new Promise(resolve => func(resolve).then(() => resolve()))

  startReimbursement = () => this.props.history.push('/create')

  // @ts-ignore
  render = () => {
    const { reimbursements } = this.props
    return (
      <div>
        <h1>Dashboard</h1>
        {reimbursements !== undefined ? (
          <ReimbursementList reimbursements={reimbursements} />
        ) : (
          <Spinner
            name="ball-spin-fade-loader"
            className="spinner"
            fadeIn="none"
            color="dodgerblue"
          />
        )}
        <button onClick={this.startReimbursement}>New Reimbursement</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reimbursements: state.reimbursements.reimbursements,
  identity: state.auth
})

export default connect(mapStateToProps)(DashboardPage)
