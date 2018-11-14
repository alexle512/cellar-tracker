'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_database = sequelize.define('users_database', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    picture: DataTypes.BLOB
  }, {});
  users_database.associate = function(models) {
    // associations can be defined here
  };
  return users_database;
};