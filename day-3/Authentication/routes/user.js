const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/User");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.get("/register", function(req, res){
    res.render('register');
})

router.post(
    "/register",
    [
        check("name", "Please Enter a Valid Name")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                "email": email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            user = new User({
                name,
                email,
                password
            });
            console.log(user);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            req.session.user = user;
            const payload = {
                user: {
                    id: user.id
                }
            };
            res.redirect("/admin");
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


router.get("/login", function(req, res){
    res.render('login');
})
router.post("/login",
                [
                    check("email", "Please enter a valid email").isEmail(),
                    check("password", "Please enter a valid password").isLength({
                        min: 6
                    })
                ], async (req, res) =>{
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.status(400).json({
                            errors: errors.array()
                        });
                    }

                    const {
                        name,
                        email,
                        password
                    } = req.body;
                    try {
                        let user = await User.findOne({
                            "email": email
                        });
                        if (user) {
                            bcrypt.compare(password, user.password).then(function (result) {
                                if(result){
                                    req.session.user = user;
                                    res.status(200).redirect("/admin");
                                }else{
                                    res.status(400).json({ message: "Login not succesful" })
                                }
                              })
                        }
                    } catch (err) {
                        console.log(err.message);
                        res.status(500).send("Error in Saving");
                    }
                }
);
module.exports = router;
