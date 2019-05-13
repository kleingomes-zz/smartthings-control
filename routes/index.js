var express = require('express');
var router = express.Router();
var st = require('../service/smartthings');
var sw = require('../capabilities/switch');
var prettyjson = require('prettyjson');
var prettyjsonOptions = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  st.listDevices().then(function(devices) {
    console.log(prettyjson.render(devices, prettyjsonOptions));
    let promises = [];
    devices.items.forEach(device => {
      promises.push(st.getFullDeviceStatus(device.deviceId).then(function(reqResult) {
        return {
          deviceId: device.deviceId,
          value: reqResult
        }
      }));
    });
    Promise.all(promises)
        .then(values => {
          console.log("all the promises were resolved!");
          for (let val of values) {
            console.log(val);
          }
          res.render('index', { title: 'Devices', devices: devices });
        })
        .catch(e => {
          console.log("error: ", e);
        });
  });
});

router.post('/devices', function(req, res) {
  let deviceId = Object.keys(req.body)[0];
  let command = req.body[deviceId];
  if (command === "on") {
    st.actuate(deviceId, sw.on());
  } else {
    st.actuate(deviceId, sw.off());
  }
  res.send('respond with a resource');
});

module.exports = router;
