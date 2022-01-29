'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'BoardListCard',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'user', key: 'id' },
          allowNull: false
        },
        boardList: {
          type: Sequelize.INTEGER,
          references: { model: 'boardList', key: 'id' },
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING(2000),
          allowNull: false
        },
        order: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      },
      {
        charset: 'utf8mb4'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('BoardListCard')
  }
};
