import Sequelize, { Model } from 'sequelize'

// para  criar a modelagem de um banco de dados relacional.
class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3000/product-file/${this.path}`
          },
        },
      },
      {
        sequelize,
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    }) // chave estrangeira que vai pro  product e buscar na tabela Category o id da chave estrangeira category_id
  }
}

export default Product
