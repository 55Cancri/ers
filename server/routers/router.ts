import * as express from 'express'
import * as movieService from '../services/movie-service'
import { Request, Response, NextFunction } from 'express'

export const router = express.Router()

router.get('/title/:title/year/:year', (req, res) =>
  movieService
    .findByYearAndTitle(parseInt(req.params.year), req.params.title)
    .then(data => res.json(data.Item))
    .catch(err => res.sendStatus(500))
)

router.get(
  '/year/:year',
  (req: Request, res: Response, next: NextFunction) => {
    next()
  },
  (req: Request, res: Response, next: NextFunction) => {
    movieService
      .findAllByYear(parseInt(req.params.year))
      .then(data => res.json(data.Items))
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  }
)

router.put('', (req: Request, res: Response) =>
  movieService
    .update(req.body)
    .then(data => res.json(data))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
)

export default router
