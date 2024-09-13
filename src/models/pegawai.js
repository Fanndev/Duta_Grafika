'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pegawai.init(
    {
      pegawai_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "pegawai_id", // Nama kolom sebenarnya di database
      },
      kode: DataTypes.STRING,
      nama_pegawai: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.STRING,
      is_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Pegawai",
    }
  );
  return Pegawai;
};