const {mongoose} = require("../Config/db");

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  token: {
    type: String,
    required: [true, "token is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("PasswordResetToken", tokenSchema);
