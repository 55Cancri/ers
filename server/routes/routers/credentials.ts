import express from 'express'
import { Request, Response, NextFunction } from 'express'

import * as userService from '../../services/user-service'
import * as reimburseService from '../../services/reimburse-service'
import { verifyToken } from '../../utils/verifyToken'

module.exports = app => {
  app.post('/signup', (req, res, next) => {
    userService
      .signup(req.body.dossier)
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        if (err.errors.global)
          res.status(400).json({ errors: { global: 'user already exists' } })
      })
  })

  app.post('/login', (req, res, next) => {
    userService
      .login(req.body.credentials)
      .then(dossier => {
        reimburseService.retrieve(dossier.username).then(query => {
          let user = {
            ...dossier,
            reimbursements: [...query.Items]
          }
          res.json(user)
        })
      })
      .catch(err => {
        if (err.errors.global)
          res.status(400).json({ errors: { global: 'invalid credentials' } })
      })
  })

  // userService.getUser
  // reimburseService.retrieve
  app.post('/persist', verifyToken, (req, res, next) => {
    const { identity } = req.body
    userService
      .getUser(identity.username)
      .then(dossier =>
        reimburseService.retrieve(dossier.username).then(query => {
          let user = {
            ...dossier,
            token: req.headers.token,
            reimbursements: [...query.Items]
          }
          res.json(user)
        })
      )
      .catch(err => {
        if (err.errors.global !== undefined)
          res.status(400).json({ errors: { global: 'invalid credentials' } })
      })
  })
}
