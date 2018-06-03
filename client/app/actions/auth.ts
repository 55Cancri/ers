import React from 'react'
import api from '../api'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.ers = user.token
    dispatch(login(user))
  })

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  localStorage.removeItem('ers')
  dispatch(logout())
}

export const startSignup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.ers = user.token
    dispatch(login(user))
  })

export const updateGeneral = data => ({
  type: 'GENERAL',
  data
})

export const startUpdateGeneral = data => async dispatch => {
  api.user.updateGeneral(data).then(user => dispatch(updateGeneral(user)))
  // const user = await api.user.updateGeneral(data)

  // dispatch(user)
}

export const updatePassword = data => ({
  type: 'PASSWORD',
  data
})

export const startUpdatePassword = data => async dispatch => {
  const user = await api.user.updatePassword(data)

  // dispatch(user)
}
