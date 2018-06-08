import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const reimburseReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        reimbursements: action.user.reimbursements
      }

    case 'RESTORE':
      console.log('restore attempt in reim redu..')
      return {
        reimbursements: action.user.reimbursements
      }

    default:
      return state
  }
}
