const {sequelize} = require("../Config/db");
const {Sequelize} = require("sequelize");

// sequelize.authenticate();

module.exports.PasswordResetToken = sequelize.define("password_reset_token", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
 });
 