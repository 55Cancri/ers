import express from 'express'
import { Request, Response, NextFunction } from 'express'

import * as userService from '../../services/user-service'
import * as reimburseService from '../../services/reimburse-service'
import { verifyToken } from '../../utils/verifyToken'

module.exports = app => {
  app.post('/signup', (req, res, next) => {
    userService
      .signup(req.body.dossier)
      .then(data => res.json(data))
      .catch(err => {
        if (err.errors.global)
          res.status(400).json({ errors: { global: 'user already exists' } })
      })
  })
}
