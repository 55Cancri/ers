import express from 'express'
import { Request, Response, NextFunction } from 'express'
import router from './routers/router'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import * as movieDao from './dao/movie-dao'

// connect webpack to express server
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import webpackDevServer from 'webpack-dev-server'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import historyApiFallback from 'connect-history-api-fallback'

const app = express()

// determine environment
const isDev = process.env.NODE_ENV !== 'production'

// setup port
const port = parseInt(process.env.PORT) || 3222
app.set('port', port)

// setup middleware
app.use(bodyParser.json())

// setup routes
// app.use('/', router)
import Routes from './routers/router'
const routes = Routes(app)

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

  // routes every request to index file in dist folder
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
