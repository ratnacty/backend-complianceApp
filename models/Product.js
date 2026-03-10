const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'product',
  timestamps: false,
});

module.exports = Product;
