var express = require('express');
var st = require('../service/smartthings');
var db = require('../service/database');

var router = express.Router();
var prettyjson = require('prettyjson');
var prettyjsonOptions = {};
/* GET home page. */
router.get('/', function(req, res) {
  st.listDevices().then(function(devices) {
      //console.log(prettyjson.render(resp, prettyjsonOptions));
      db.saveDevices(devices);
      res.render('setup', { title: 'Setup', devices: devices });
  });
});

router.post('/devices', function(req, res, next) {
    var x = 2
});


module.exports = router;
