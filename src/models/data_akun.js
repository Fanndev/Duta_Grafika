'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // deDafine association here
      Data_akun.belongsTo(models.Transaksipenjualan, { foreignKey: "data_id" });
      Data_akun.belongsTo(models.Transaksipembelian, { foreignKey: "data_id" });
      Data_akun.belongsTo(models.Operasiohal, { foreignKey: "data_id" });
    }
  }
  Data_akun.init({
    data_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "data_id", // Nama kolom sebenarnya di database
    },
    kode: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    debit: DataTypes.DOUBLE,
    kredit: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Data_akun',
  });
  return Data_akun;
};