import express from 'express'
import { Request, Response, NextFunction } from 'express'

const pizzaRouter = express.Router()
let pizza = [
  {
    name: 'supreme',
    size: 'large'
  },
  {
    name: 'buffalo',
    size: 'large'
  }
]

pizzaRouter.get('', (req: Request, res: Response) => {
  console.log('retreiving all pizzas')
  res.json(pizza)
})

pizzaRouter.get('/name/:name', (req: Request, res: Response) => {
  const name = req.params.name
  console.log(`retrieving pizza with name ${name}`)
  for (let p of pizza) {
    if (p.name === name) {
      res.json(p)
      return
    }
  }
  res.end()
})

pizzaRouter.post('/add', (req: Request, res: Response) => {
  console.log(`adding pizza: ${JSON.stringify(req.body.name)} to pizzas`)
  if (!req.body.name || !req.body.size) {
    res.sendStatus(400)
  } else {
    const p = {
      name: req.body.name,
      size: req.body.size
    }
    pizza.push(req.body)
    res.sendStatus(201)
  }

  console.log(pizza)
  res.end()
})

pizzaRouter.delete('/name/:name', (req: Request, res: Response) => {
  pizza = pizza.filter(pizza => pizza.name !== req.params.name)
})

export default pizzaRouter
