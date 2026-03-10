const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StoreAccount = sequelize.define('StoreAccount', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'store_account',
  timestamps: false,
});

module.exports = StoreAccount;
