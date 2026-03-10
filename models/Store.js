const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  store_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1,
  },
}, {
  tableName: 'store',
  timestamps: false,
});

module.exports = Store;
