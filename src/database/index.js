import { Sequelize } from 'sequelize'

import Product from '../app/models/Product'
import User from '../app/models/User'
import Category from '../app/models/Category'

import configDatabase from '../config/database'

// para  criar a conexão com o banco de dados, precisamos instanciar a class do sequelize passando como parâmetro as informações da nossa base de dados
const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      // para  cada model passado na lista acima, executa o método init do Model
      .map((model) => model.init(this.connection))
      // para  executar as associações entre os models
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }
}

export default new Database()
