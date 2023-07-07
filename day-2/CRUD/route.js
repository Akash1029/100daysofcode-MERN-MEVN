var express = require('express');
var router = express.Router();

router.get("/first_template", function (req, res) {
    res.render('first_view');
})

