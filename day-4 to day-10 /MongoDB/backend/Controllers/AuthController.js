const User = require("../Models/UserModel");
const PasswordResetToken = require("../Models/PasswordResetToken");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {transporter} = require('../Config/mail');
require("dotenv").config();


module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password ){
        return res.json({message:'All fields are required'})
        }
        const user = await User.findOne({ email });
        
        if(!user){
        return res.json({message:'Incorrect password or email' }) 
        }
        const auth = await bcrypt.compare(password,user.password);
        
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
};

module.exports.ForgotPassword = async (req, res) => {
  try {
      const { email } = req.body;
      if(!email){
          return res.json({message:'Please enter you Email'})
      }
      console.log("email", email);
      const user = await User.findOne({ email }).exec();

      console.log("user", user);
      if(!user){
          return res.status(400).json({message:"User does'nt exist Please sign up" }) 
      }

      const generatedToken = crypto.randomBytes(32);

      if (!generatedToken) {
          return res.status(500).json({
              message: "An error occured. Please try again later.",
              status: "error",
          });
      }

      const convertTokenToHexString = generatedToken.toString("hex");

      const newItem = {
                          "email": email,
                          "token": convertTokenToHexString 
                      };
      const query = {email: user.email};
      const update = { $set: newItem};
      const options = { upsert: true };
      
      await PasswordResetToken.updateOne(query, update, options);

      const mailData = {
          from: process.env.MAIL_FROM_ADDRESS,
          to: email,
          subject: "Reset Password",
          html: `<b>Hello! </b><br> You are receiving this email because we received a password reset request for your account.<br/> <br><a href="http://localhost:5173/reset-password/${convertTokenToHexString}">Reset Password</a><br>Regards<br>Akash Kushwaha`,
      };


      transporter.sendMail(mailData, (error, info) => {
          if (error) {
              return console.log(error);
          }
          res.status(200).send({ message: "We have sent you the Reset mail Please check", message_id: info.messageId, success: true });
      });
  } catch (error) {
      console.error(error);
  }
};

module.exports.ResetPassword = async (req, res, next) => {
  try {
      const { token } = req.params;
      if(!token){
          return res.status(200).json({message:"Token doesn't match"})
      }
      const forgot = await PasswordResetToken.findOne({ token });
      // console.log("forgot", forgot);
      if(!forgot){
          return res.status(404).json({success: false}) 
      }else {
          return res.status(200).json({success: true});
      }

  } catch (error) {
      console.error(error);
  }

};

module.exports.ChangePassword = async (req, res, next) => {
  try {
      const { token } = req.params;
      const { password } = req.body;
      if(!token){
          return res.status(200).json({message:"Token doesn't match"})
      }
      const forgot = await PasswordResetToken.findOne({ token});

      // console.log("forgot", forgot);
      if(!forgot){
          return res.status(400).json({message:"Token Expired. Please try again" }) 
      }

      const user = await User.findOne({email: forgot.email});

      if(!user){
          return res.status(400).json({message:"User does'nt exist Please sign up" }) 
      }

      user.password = password;
      await user.save();
      console.log("newuser", user);
      await forgot.deleteOne();

      res
      .status(200)
      .json({ message: "Your Password updated successfully", success: true });
      next();

  } catch (error) {
      console.error(error);
  }
};
