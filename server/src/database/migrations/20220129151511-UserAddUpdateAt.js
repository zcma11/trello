'use strict'
// 增加删除 updatedAt 字段
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('User', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false
    })
    queryInterface.addColumn('User', 'password', {
        type: Sequelize.STRING(32),
        allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('User', 'updatedAt')
    queryInterface.removeColumn('User', 'password')
  }
}
