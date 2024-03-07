import express from 'express'
import routes from './routes'
import { resolve } from 'path'

import './database'

// para  o express entender json no body da requisição.
class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json()) // Permite que o Express entenda
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    ) // serve os arquivos estáticos do diretório uploads
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
