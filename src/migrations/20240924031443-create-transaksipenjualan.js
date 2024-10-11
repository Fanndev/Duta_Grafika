'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaksipenjualans", {
      penjualan_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nota: {
        type: Sequelize.STRING,
      },
      tanggal: {
        type: Sequelize.STRING,
      },
      total_bayar: {
        type: Sequelize.DOUBLE,
      },
      kembali: {
        type: Sequelize.DOUBLE,
      },
      nama_barang: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.DOUBLE,
      },
      total_pembelian: {
        type: Sequelize.DOUBLE,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transaksipenjualans');
  }
};