'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaksi.init(
    {
      transaksi_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "transaksi_id", // Nama kolom sebenarnya di database
      },
      kode: DataTypes.STRING,
      nama_barang: DataTypes.STRING,
      tgl_pembelian: DataTypes.STRING,
      total_order: DataTypes.STRING,
      harga_barang: DataTypes.DOUBLE,
      is_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Transaksi",
    }
  );
  return Transaksi;
};