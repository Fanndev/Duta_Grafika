'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "customer_id", // Nama kolom sebenarnya di database
      },
      kode: DataTypes.STRING,
      nama_customer: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.STRING,
      is_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};