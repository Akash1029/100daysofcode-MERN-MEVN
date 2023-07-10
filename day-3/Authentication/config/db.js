const mongoose = require("mongoose");
// Replace this with your MONGOURI.
const MONGOURI = "mongodb://127.0.0.1:27017/auth_db";
console.log(MONGOURI);
const InitiateMongoServer = async () => {
    console.log("trying");
  try {
    console.log("trying");
    await mongoose.connect(MONGOURI);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;