const {User} = require("../Models/UserModel.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {sequelize} = require("../Config/db.js");

// sequelize.authenticate();


module.exports.userVerification = (req, res) => {
  // console.log(req.cookies);
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    // console.log("data", data);
    if (err) {
     return res.json({ status: false })
    } else {
      await sequelize.sync();
      const user = await User.findOne({
                    where: {
                        id: data.id,
                    },
    });
      if (user) {
        return res.json({ status: true, user: user.name })
      }else{
        return res.json({ status: false }) 
      }
    }
  })
}
