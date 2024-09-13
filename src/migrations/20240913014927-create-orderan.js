'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orderans', {
      orderan_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode: {
        type: Sequelize.STRING
      },
      tgl_terima: {
        type: Sequelize.STRING
      },
      tgl_ambil: {
        type: Sequelize.STRING
      },
      nama_pesanan: {
        type: Sequelize.STRING
      },
      jenis_pesanan: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.STRING
      },
      keterangan: {
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
    await queryInterface.dropTable('Orderans');
  }
};