const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

config.entry.app.unshift("webpack-dev-server/client?http://localhost:2018/");

const compiler = webpack(config)

const server = new webpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
  publicPath: '/',
})

server.listen(2018, '0.0.0.0', function(err) {
  if (err) {
    throw err
  }
})