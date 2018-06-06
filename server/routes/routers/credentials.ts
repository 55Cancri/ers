import express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as userService from '../../services/user-service'
import * as reimburseService from '../../services/reimburse-service'

// export const router = express.Router()

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

  app.post('/login', (req, res, next) => {
    userService
      .login(req.body.credentials)
      .then(data => res.json(data))
      .catch(err => {
        if (err.errors.global)
          res.status(400).json({ errors: { global: 'invalid credentials' } })
      })
  })
  // movieService
  //   .findByYearAndTitle(parseInt(req.params.year), req.params.title)
  //   .then(data => res.json(data.Item))
  //   .catch(err => res.sendStatus(500))

  app.get('/year/:year', (req: Request, res: Response, next: NextFunction) => {
    console.log('route 2')

    // userService.createTable()
    // .findAllByYear(parseInt(req.params.year))
    // .then(data => res.json(data.Items))
    // .catch(err => {
    //   console.log(err)
    //   res.sendStatus(500)
    // })
  })

  app.put(
    '',
    (req: Request, res: Response, next: NextFunction) => console.log('route 2')
    // userService.createTable()
    // .update(req.body)
    // .then(data => res.json(data))
    // .catch(err => {
    //   console.log(err)
    //   res.sendStatus(500)
    // })
  )
}
