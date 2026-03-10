const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReportProduct = sequelize.define('ReportProduct', {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  compliance: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'report_product',
  timestamps: false,
});

module.exports = ReportProduct;
