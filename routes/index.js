var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'MathRacer' });
    //res.sendFile("index", {title: 'MathRacer'});

});

module.exports = router;
