import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import Spinner from 'react-spinkit'
import { withRouter } from 'react-router'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import ReimbursementList from './dashboard/ReimbursementList'
import AdminReimbursementList from './dashboard/AdminReimbursementList'

import { startPersist } from '../actions/auth'

// extend RouteComponentProps to get access to history object
interface IProps extends RouteComponentProps<any> {
  reimbursements: Array<Object>
  everyReimbursement: Array<Object>
  identity: {
    username: string
    token: string
    role: string
  }
}

export class DashboardPage extends Component<IProps> {
  // @ts-ignore
  componentDidMount = () =>
    console.log('typeof every: ', typeof this.props.everyReimbursement)

  // convert any function to asynchronous and return a promise
  makeAsync = async func =>
    new Promise(resolve => func(resolve).then(() => resolve()))

  startReimbursement = () => this.props.history.push('/create')

  // @ts-ignore
  render = () => {
    const { identity, reimbursements, everyReimbursement } = this.props
    return (
      <div>
        <h1>Dashboard</h1>
        {identity.role !== 'undefined' && (
          <div>
            {identity.role === 'employee' ? (
              <div>
                {reimbursements !== undefined ? (
                  <ReimbursementList reimbursements={reimbursements} />
                ) : (
                  <Spinner
                    name="ball-spin-fade-loader"
                    className="spinner"
                    fadeIn="none"
                    color="darkgray"
                  />
                )}
                <button onClick={this.startReimbursement}>
                  New Reimbursement
                </button>
              </div>
            ) : (
              <div>
                {everyReimbursement !== undefined ? (
                  <AdminReimbursementList
                    everyReimbursement={everyReimbursement}
                  />
                ) : (
                  <Spinner
                    name="ball-spin-fade-loader"
                    className="spinner"
                    fadeIn="none"
                    color="darkgray"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  identity: state.auth,
  reimbursements: state.reimbursements.reimbursements,
  everyReimbursement: state.reimbursements.everyReimbursement
})

export default connect(mapStateToProps)(DashboardPage)
