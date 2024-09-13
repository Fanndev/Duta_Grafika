'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orderan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orderan.init(
    {
      orderan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "orderan_id", // Nama kolom sebenarnya di database
      },
      kode: DataTypes.STRING,
      tgl_terima: DataTypes.STRING,
      tgl_ambil: DataTypes.STRING,
      nama_pesanan: DataTypes.STRING,
      jenis_pesanan: DataTypes.STRING,
      qty: DataTypes.STRING,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Orderan",
    }
  );
  return Orderan;
};