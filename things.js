const express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    res.send('Get Things');
});

router.post("/", function(req, res){
    res.send('Post Things');
});

router.get('/:name/:id([0-9]{5})', function(req, res){
    res.send(`Hello ${req.params.name} Id: ${req.params.id}`);
})

module.exports = router;