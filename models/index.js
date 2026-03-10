const sequelize = require('../config/database');
const StoreAccount = require('./StoreAccount');
const StoreArea = require('./StoreArea');
const Store = require('./Store');
const Brand = require('./Brand');
const Product = require('./Product');
const ReportProduct = require('./ReportProduct');

// Associations
Store.belongsTo(StoreAccount, { foreignKey: 'account_id', as: 'account' });
StoreAccount.hasMany(Store, { foreignKey: 'account_id' });

Store.belongsTo(StoreArea, { foreignKey: 'area_id', as: 'area' });
StoreArea.hasMany(Store, { foreignKey: 'area_id' });

Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(Product, { foreignKey: 'brand_id' });

ReportProduct.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
Store.hasMany(ReportProduct, { foreignKey: 'store_id' });

ReportProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(ReportProduct, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  StoreAccount,
  StoreArea,
  Store,
  Brand,
  Product,
  ReportProduct,
};
