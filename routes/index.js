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
          device: device,
          component: reqResult
        }
      }));
    });
    Promise.all(promises)
        .then(deviceComponents => {
          console.log("all the promises were resolved!");
          for (let deviceComponent of deviceComponents) {
            //console.log(val.value);
            //deviceComponent.device = deviceComponent.component;
            for (let capability in deviceComponent.component.components.main) {
              if (capability === "switch") {
                if (deviceComponent.component.components.main.switch.switch.value === "on")
                    deviceComponent.device.switch ="off";
                else
                    deviceComponent.device.switch = "on";
                break;
              } else {
                  deviceComponent.device.switch = "";
              }
            }
          }
          res.render('index', { title: 'Devices', deviceComponents: deviceComponents });
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
  //res.send('respond with a resource');
  res.redirect('http://localhost:3000')
});

module.exports = router;
