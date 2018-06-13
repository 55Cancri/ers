import express from 'express'
import * as reimburseService from '../../services/reimburse-service'

module.exports = app => {
  app.post('/submit', (req, res) => {
    console.log('submitting...', req.body.reimbursement)
    // {items[], username, role}
    reimburseService
      .submit(req.body.reimbursement)
      .then(() => reimburseService.retrieve(req.body.reimbursement.username))
      .then(data => res.json(data))
      .catch(err => {
        if (!!err.errors.global)
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
