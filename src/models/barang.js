'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barang.init(
    {
      barang_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "barang_id", // Nama kolom sebenarnya di database
      },
      kode: DataTypes.STRING,
      nama_barang: DataTypes.STRING,
      stok: DataTypes.INTEGER,
      harga_beli: DataTypes.DOUBLE,
      harga_jual: DataTypes.DOUBLE,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Barang",
    }
  );
  return Barang;
};