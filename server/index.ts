import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import router from './routers/router'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as fs from 'fs'
import * as movieDao from './dao/movie-dao'

// connect webpack to express server
import * as webpack from 'webpack'
import webpackConfig from '../webpack.config'
import * as webpackDevServer from 'webpack-dev-server'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import * as historyApiFallback from 'connect-history-api-fallback'

const app = express()

// determine environment
const isDev = process.env.NODE_ENV !== 'production'

// setup port
const port = parseInt(process.env.PORT) || 3222
app.set('port', port)

// setup middleware
app.use(bodyParser.json())

// setup routes
app.use('/movies', router)

if (isDev) {
  // ??
  const compiler = webpack(webpackConfig)

  // ??
  app.use(
    historyApiFallback({
      verbose: false
    })
  )

  // ??
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, '../client/public'),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  )

  // ??
  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.resolve(__dirname, '../dist')))
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
    res.end()
  })
}

// start app
app.listen(port, '0.0.0.0', err => {
  if (err) console.error(err)

  console.info(
    `>>> Connected to 🌎 . Open http://localhost:${port} in your browser.`
  )
})
