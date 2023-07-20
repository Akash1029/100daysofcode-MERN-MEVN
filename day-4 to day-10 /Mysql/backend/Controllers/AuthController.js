const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
// const {Sequelize} = require('sequelize');
const {User} = require("../Models/UserModel");
const {PasswordResetToken} = require("../Models/PasswordResetToken");
const {sequelize} = require("../Config/db");
const crypto = require("crypto");
var nodemailer = require('nodemailer');
const {transporter} = require('../Config/mail');
require("dotenv").config();

// sequelize.authenticate();

module.exports.Signup = async (req, res, next) => {
    // console.log(req);
    try {
        const { email, password, username } = req.body;
        await sequelize.sync();

        const existingUser = await User.findOne({
                                    where: {
                                        email: email,
                                    },
                                });

        // console.log("existingUser", existingUser);

        const newPassword = await bcrypt.hash(password, 12); 
        // console.log("newPassword", newPassword);                
        // const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.json({ message: "User already exists" });
        }
        const user = await User.create({
                                           "name": username, 
                                           "email": email,
                                           "password": newPassword 
                                        });
        const token = createSecretToken(user.id);
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

        await sequelize.sync();

        const user = await User.findOne({
                                    where: {
                                        email: email,
                                    },
                                });

        // console.log("user", user);
        if(!user){
            return res.json({message:'Incorrect password or email' }) 
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
            return res.json({message:'Incorrect password or email' }) 
        }
        const token = createSecretToken(user.id);
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

        await sequelize.sync();

        const user = await User.findOne({
                                    where: {
                                        email: email,
                                    },
                                });

        // console.log("user", user);
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

        // const forgot = await PasswordResetToken.create({
        //     "email": email,
        //     "token": convertTokenToHexString 
        //  });
        const newItem = {
                            "email": email,
                            "token": convertTokenToHexString 
                        };
        await updateOrCreate(PasswordResetToken, {email: user.email}, newItem);

        const mailData = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: "Reset Password",
            // text: text,
            html: `<b>Hello! </b><br> You are receiving this email because we received a password reset request for your account.<br/> <br><a href="http://localhost:5173/reset-password/${convertTokenToHexString}">Reset Password</a><br>Regards<br>Akash Kushwaha`,
        };

        // let transporter = nodemailer.createTransport({
        //     port: 465,               // true for 465, false for other ports
        //     host: "smtp.gmail.com",
        //        auth: {
        //             user: 'kitlabs35@gmail.com',
        //             pass: 'olcvukudqcxqcgfg',
        //          },
        //     secure: true,
        // });

        // console.log("transporter", transporter);

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

        await sequelize.sync();

        const forgot = await PasswordResetToken.findOne({
                                    where: {
                                        token: token,
                                    },
                                });

        // console.log("forgot", forgot);
        if(!forgot){
            return res.status(404).json({success: false}) 
        }else {
            return res.status(200).json({success: true});
        }

        // const user = await User.findOne({
        //     where: {
        //         email: token.email,
        //     },
        // });

        // // console.log("user", user);
        // if(!user){
        //     return res.status(400).json({message:"User does'nt exist Please sign up" }) 
        // }
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

        await sequelize.sync();

        const forgot = await PasswordResetToken.findOne({
                                    where: {
                                        token: token,
                                    },
                                });

        // console.log("forgot", forgot);
        if(!forgot){
            return res.status(400).json({message:"Token Expired. Please try again" }) 
        }

        const user = await User.findOne({
            where: {
                email: forgot.email,
            },
        });

        if(!user){
            return res.status(400).json({message:"User does'nt exist Please sign up" }) 
        }

        const newPassword = await bcrypt.hash(password, 12); 

        user.password = newPassword;
        await user.save();

        await forgot.destroy();

        res
        .status(200)
        .json({ message: "Your Password updated successfully", success: true });
        next();

    } catch (error) {
        console.error(error);
    }
};

function updateOrCreate (model, where, newItem) {
    // First try to find the record
    return model
    .findOne({where: where})
    .then(function (foundItem) {
        if (!foundItem) {
            // Item not found, create a new one
            return model
                .create(newItem)
                .then(function (item) { return  {item: item, added: true}; })
        }
         // Found an item, update it
        return model
            .update(newItem, {where: where})
            .then(function (item) { return {item: item, added: true} }) ;
    })
};