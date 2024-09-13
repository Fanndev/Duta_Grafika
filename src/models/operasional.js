'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operasional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Operasional.init(
    {
      operasional_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "operasional_id", // Nama kolom sebenarnya di database
      },
      kode: DataTypes.STRING,
      nama_oper: DataTypes.STRING,
      tgl_transaksi: DataTypes.STRING,
      debet: DataTypes.DOUBLE,
      kredit: DataTypes.DOUBLE,
      nama_pegawai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Operasional",
    }
  );
  return Operasional;
};