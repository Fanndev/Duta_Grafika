'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jurnal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jurnal.init(
    {
      jurnal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "jurnal_id", // Nama kolom sebenarnya di database
      },
      tanggal: DataTypes.STRING,
      nomor_jurnal: DataTypes.STRING,
      akun: DataTypes.STRING,
      debet: DataTypes.DOUBLE,
      kredit: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Jurnal",
    }
  );
  return Jurnal;
};