import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const authReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.user.userId,
        token: action.user.token,
        username: action.user.username,
        email: action.user.email,
        photo: action.user.photo,
        confirmed: action.user.confirmed
      }

    case 'LOGOUT':
      return {}

    case 'GENERAL':
      // console.log('general data: ', action.data)
      return {
        ...state,
        // id: action.data.userId,
        // token: action.data.token,
        // confirmed: action.data.verified,
        username: action.data.username,
        photo: action.data.photo,
        email: action.data.email
      }

    default:
      return state
  }
}
