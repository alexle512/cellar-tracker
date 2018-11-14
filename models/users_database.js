'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_database = sequelize.define('users_database', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    picture: DataTypes.TEXT
  }, {});
  users_database.associate = function(models) {
    // associations can be defined here
  };
  return users_database;
};