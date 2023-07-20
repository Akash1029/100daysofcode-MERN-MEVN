const { Signup, Login, ForgotPassword, ResetPassword, ChangePassword } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/signup', function(req, res, next){
    // console.log(req.body);
    Signup(req, res, next);
})
router.post('/login', function(req, res, next){
    Login(req, res, next)
})
router.post("/forgot", function(req, res){
    ForgotPassword(req, res)
})
router.post("/reset-password/:token", function(req, res, next){
    ResetPassword(req, res, next)
})

router.post("/change-password/:token", function(req, res, next){
    ChangePassword(req, res, next)
})
router.post('/', function(req, res){
    userVerification(req, res)
});

module.exports = router;
