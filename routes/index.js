const express = require('express');
const router = express.Router();

const {ENVIROMENT, PORT} = process.env;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
