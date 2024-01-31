import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

// para  criar a modelagem de um banco de dados relacional
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // não vai ser armazenado no BD.
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    )

    // para  que o password seja hash antes de salvar no BD.
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10)
      }
    })

    return this
  }
}

export default User
