'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Attachment',
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
        originName: {
          type: Sequelize.STRING(255),
          defaultValue: '',
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        type: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        size: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
    return queryInterface.dropTable('Attachment')
  }
};
