'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksipembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaksipembelian.init(
    {
      pembelian_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "pembelian_id", // Nama kolom sebenarnya di database
      },
      nota: DataTypes.STRING,
      tanggal: DataTypes.STRING,
      nama_supplier: DataTypes.STRING,
      nama_barang: DataTypes.STRING,
      harga: DataTypes.DOUBLE,
      total_pembelian: DataTypes.DOUBLE,
      total_bayar: DataTypes.DOUBLE,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaksipembelian",
    }
  );
  return Transaksipembelian;
};