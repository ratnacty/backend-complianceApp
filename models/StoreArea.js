const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StoreArea = sequelize.define('StoreArea', {
  area_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  area_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'store_area',
  timestamps: false,
});

module.exports = StoreArea;
