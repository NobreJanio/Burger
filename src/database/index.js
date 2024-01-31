import { Sequelize } from 'sequelize'

import User from '../app/models/User'

import configDatabase from '../config/database'

// para  criar a conexão com o banco de dados, precisamos instanciar a class do sequelize passando como parâmetro as informações da nossa base de dados
const models = [User]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models.map((model) => model.init(this.connection))
  }
}

export default new Database()
