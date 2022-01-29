'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'CardAttachment',
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
        boardListCardId: {
          type: Sequelize.INTEGER,
          references: { model: 'boardListCard', key: 'id' },
          allowNull: false
        },
        attachmentId: {
          type: Sequelize.INTEGER,
          references: { model: 'attachment', key: 'id' },
          allowNull: false
        },
        isCover: {
          type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('CardAttachment')
  }
};
