import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteProps, withRouter } from 'react-router'

import ReimburseForm from './reimbursement/ReimburseForm'

// need to pass history object to child components
// has history object by virtue of being connected to redux
export class ReimbursePage extends Component<any> {
  // @ts-ignore
  render = () => {
    return (
      <div>
        <h1>New reimbursement</h1>
        <ReimburseForm history={this.props.history} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username
})

export default connect(mapStateToProps)(ReimbursePage)
