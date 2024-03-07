import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Product from '../app/models/Product'
import User from '../app/models/User'

import configDatabase from '../config/database'

// para  criar a conexão com o banco de dados, precisamos instanciar a class do sequelize passando como parâmetro as informações da nossa base de dados
const models = [User, Product]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      // para  cada model passado na lista acima, executa o método init do Model
      .map((model) => model.init(this.connection))
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/codeburger',
    )
  }
}

export default new Database()
