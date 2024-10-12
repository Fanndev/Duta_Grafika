'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksipenjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaksipenjualan.init(
    {
      penjualan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "penjualan_id", // Nama kolom sebenarnya di database
      },
      nota: DataTypes.STRING,
      tanggal: DataTypes.STRING,
      total_bayar: DataTypes.DOUBLE,
      kembali: DataTypes.DOUBLE,
      nama_barang: DataTypes.STRING,
      harga: DataTypes.DOUBLE,
      total_pembelian: DataTypes.DOUBLE,
      qty: DataTypes.INTEGER,
      kode: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Transaksipenjualan",
    }
  );
  return Transaksipenjualan;
};