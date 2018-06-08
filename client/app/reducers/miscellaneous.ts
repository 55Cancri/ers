import React from 'react'

interface IAction {
  type: string
  payload?: any
}

const initialState = {}

export const miscellaneousReducer = (
  state = initialState,
  action: any = {}
) => {
  switch (action.type) {
    case 'REQUEST':
      console.log('now in reducer after db submit')
      return {
        ...state,
        reimbursements: action.reimbursements
      }

    case 'DISTRIBUTE':
      return {
        ...state
        // oldUndistributedCash: state.newUndistributedCash,
        // newUndistributedCash: action.user.undistributedCash
      }

    case 'DELETE':
      return {
        ...state
        // oldPoints: state.newPoints,
        // newPoints: action.user.points,
        // oldUndistributedCash: state.newUndistributedCash,
        // newUndistributedCash: action.user.undistributedCash
      }

    case 'WIPE':
      return {
        ...state
        // oldUndistributedCash: state.newUndistributedCash,
        // newUndistributedCash: action.user.undistributedCash
      }

    case 'NUKE':
      return {
        ...state
        // oldPoints: 100,
        // newPoints: 100,
        // oldUndistributedCash: state.newUndistributedCash,
        // newUndistributedCash: action.user.undistributedCash
      }

    default:
      return state
  }
}
