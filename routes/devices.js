var express = require('express');
var router = express.Router();
var st = require('../service/smartthings');
var sw = require('../capabilities/switch');

/* POST device command. */
router.post('/actuate', function(req, res) {
  st.actuate("", sw.on());
  res.send('respond with a resource');
});

module.exports = router;
