'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        img_profile: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        access_token: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
        }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
