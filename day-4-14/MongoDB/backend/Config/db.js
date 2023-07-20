var mongoose = require('mongoose');

require("dotenv").config();

mongoose
      .connect(`mongodb://localhost/${process.env.DB_DATABASE}`)
      .then(() => console.log("MongoDB is  connected successfully"))
      .catch((err) => console.error(err));;

module.exports = {mongoose};
