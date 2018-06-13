import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const reimburseReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('now in reimburse reducer')
      return {
        reimbursements: action.user.reimbursements,
        everyReimbursement: action.user.pendingTickets
      }

    case 'RESTORE':
      console.log('restore attempt in reim redu..')
      return {
        reimbursements: action.user.reimbursements,
        everyReimbursement: action.user.pendingTickets
      }

    case 'SUBMIT':
      return {
        reimbursements: action.data.Items
      }

    default:
      return state
  }
}
