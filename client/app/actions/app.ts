import React from 'react'
import api from '../api'

export const setUser = data => ({
  type: 'INITIAL_DATA',
  data
})

export const startSetUser = email => dispatch => {
  api.user.getUser(email).then(user => {
    // set what information is put in redux on reloads
    dispatch(
      setUser({
        // wants: user.wants,
        // needs: user.needs
      })
    )
  })
}

// export const submitRequest = request => ({
//   type: 'REQUEST',
//   request
// })

// export const startSubmitRequest = reimbursement => dispatch =>
//   api.user
//     .submitReimbursement(reimbursement)
//     .then(data => dispatch(reimbursement))

export const submitReimbursement = data => ({
  type: 'SUBMIT',
  data
})

export const startSubmitReimbursement = data => dispatch =>
  api.user
    .submitReimbursement(data)
    .then(user => dispatch(submitReimbursement(user)))

export const deleteAccount = user => ({
  type: 'DELETE',
  user
})

export const startDeleteAccount = data => dispatch =>
  api.user.deleteAccount(data).then(user => dispatch(deleteAccount(user)))

export const nuke = user => ({
  type: 'NUKE',
  user
})

export const startNuke = email => dispatch =>
  api.user.nuke(email).then(user => {
    dispatch(nuke(user))
  })
