import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

// para  criar as rotas, é necessário instanciar o router e utilizá-lo como parâmetro na criação das rotas.
const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

export default routes
