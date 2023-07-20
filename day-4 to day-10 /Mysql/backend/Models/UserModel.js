const {sequelize} = require("../Config/db");
const {Sequelize} = require("sequelize");

// console.log(connection);
// connection.connect()

// sequelize.authenticate();

module.exports.User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 });
 