'use strict'
// 初始化用户表
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'User',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(20),
          unique: true,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      },
      {
        charset: 'utf8mb4'
      }
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('User')
  }
}
