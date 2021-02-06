import { join, resolve } from 'path'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '$config/webpack/webpack.config.js'

import { ExpressModule } from '../../app'
import express from 'express'

export const WebpackModule: ExpressModule = {
  onRegister(app) {
    let compiler = webpack(config)

    if (process.env.NODE_ENV === 'development') {
      app.use(
        webpackDevMiddleware(compiler, {
          publicPath: config.output.publicPath,
          stats: 'minimal',
        })
      )
      app.use(webpackHotMiddleware(compiler))

      app.get('*', (_, res, next) => {
        const filename = resolve(compiler.outputPath, 'index.html')
        // @ts-ignore
        compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) {
            return next(err)
          }
          res.set('content-type', 'text/html')
          res.send(result)
          res.end()
        })
      })
    }

    if (process.env.NODE_ENV === 'production') {
      compiler.run((err, stats) => {})

      app.use(express.static(join(process.cwd(), 'dist')))
      app.get('*', (_, res) => {
        res.sendFile(join(process.cwd(), 'dist/index.html'))
      })
    }
  },
}
