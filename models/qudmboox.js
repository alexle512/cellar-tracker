'use strict';
module.exports = (sequelize, DataTypes) => {
  const qudmboox = sequelize.define('qudmboox', {
    title: DataTypes.STRING,
    style: DataTypes.STRING,
    price: DataTypes.FLOAT,
    notes: DataTypes.TEXT
  }, {});
  qudmboox.associate = function(models) {
    // associations can be defined here
  };
  return qudmboox;
};