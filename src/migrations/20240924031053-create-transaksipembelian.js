'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaksipembelians", {
      pembelian_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nota: {
        type: Sequelize.STRING,
      },
      nama_barang: {
        type: Sequelize.STRING,
      },
      tanggal: {
        type: Sequelize.STRING,
      },
      nama_supplier: {
        type: Sequelize.STRING,
      },
      total_pembelian: {
        type: Sequelize.DOUBLE,
      },
      harga: {
        type: Sequelize.DOUBLE,
      },
      total_bayar: {
        type: Sequelize.DOUBLE,
      },
      total_harga: {
        type: Sequelize.DOUBLE,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      kode: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Transaksipembelians');
  }
};