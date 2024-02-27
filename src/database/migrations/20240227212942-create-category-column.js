'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // para  criar um novo campo em uma tabela, usamos o método "addColumn" da query interface
    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      // para  que esse campos seja relacionado a  outro campo de outra tabela, precisamos usar a propriedade references do tipo    // tipo do dado que será ar   //tipagem do dado que vai   //tipagem do campo que será ad
      references: { model: 'categories', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category_id')
  },
}
