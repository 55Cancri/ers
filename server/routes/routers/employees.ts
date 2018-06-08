import express from 'express'
import * as reimburseService from '../../services/reimburse-service'

module.exports = app => {
  app.post('/request', (req, res, next) => {
    console.log('reimbursement', req.body.reimbursement)
    reimburseService
      .create(req.body.reimbursement)
      .then(data => res.json(data))
      .catch(err => {
        if (err.errors.global)
          res.status(400).json({ errors: { global: 'save unsuccessful' } })
      })
  })
}

// app.post('/signup', (req, res, next) => {
//   userService
//     .signup(req.body.dossier)
//     .then(data => res.json(data))
//     .catch(err => {
//       if (err.errors.global)
//         res.status(400).json({ errors: { global: 'user already exists' } })
//     })
// })
