import React from 'react'

interface IAction {
  type: string
  payload?: any
}

const initialState = {
  // oldPoints: 100,
  // newPoints: 100,
  // oldUndistributedCash: 0,
  // newUndistributedCash: 0,
  // available: 4
}

export const appReducer = (state = initialState, action: any = {}) => {
  switch (action.type) {
    case 'DIVVY':
      return {
        ...state
        // oldPoints: state.newPoints,
        // newPoints: action.user.points,
        // oldUndistributedCash: state.newUndistributedCash,
        // newUndistributedCash: action.user.undistributedCash
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
