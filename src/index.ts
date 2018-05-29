import express from 'express'
import { Request, Response, NextFunction } from 'express'
import pizzaRouter from './routers/pizza-router'
import bodyParser from 'body-parser'

const app = express()

const port = 3000
app.set('port', port)

// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// )

app.use(bodyParser.json())

app.use('/before', (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `request was made with url: ${req.path} and method: ${req.method}`
  )
  next()
})

app.use('/pizzas', pizzaRouter)

app.listen(port, () => console.log(`app is running on port: ${port}`))
