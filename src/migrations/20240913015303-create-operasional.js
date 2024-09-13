'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Operasionals', {
      operasional_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode: {
        type: Sequelize.STRING
      },
      nama_oper: {
        type: Sequelize.STRING
      },
      tgl_transaksi: {
        type: Sequelize.STRING
      },
      debet: {
        type: Sequelize.DOUBLE
      },
      kredit: {
        type: Sequelize.DOUBLE
      },
      nama_pegawai: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Operasionals');
  }
};