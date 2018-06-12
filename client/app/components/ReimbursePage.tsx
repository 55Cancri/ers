import React, { Component } from 'react'

import ReimburseForm from './reimbursement/ReimburseForm'

export class ReimbursePage extends Component {
  state = {
    items: [
      {
        id: '',
        title: '',
        type: 'travel',
        amount: 0,
        description: '',
        receipts: '',
        timeOfExpense: 0
      }
    ]
  }

  // onInputChange = ({ target }) => {
  //   console.log('hey you hit me!', target.value)
  //   const { name, value } = target
  //   this.setState({
  //     [name]: value
  //   } as any)
  // }

  onSubmit = () => {
    console.log('submitting data...')
  }

  // @ts-ignore
  render = () => {
    return (
      <div>
        <h1>New reimbursement</h1>
        <ReimburseForm
        // handleItemChange={this.handleItemChange}
        // state={this.state.items}
        // setIdState={this.setIdState}
        />
      </div>
    )
  }
}

export default ReimbursePage
