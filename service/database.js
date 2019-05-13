const rp = require('request-promise');
const constants = require('../config/constants');
const prettyjson = require('prettyjson');
const stApi = 'https://api.smartthings.com/v1';
const prettyjsonOptions = {};

module.exports = {
    /**
     * Saves SmartThings devices to a local sql database
     * @returns {Promise} A list of user devices.
     */
    saveDevices: function(devices) {
        console.log("Save Devices:");
        console.log(prettyjson.render(devices, prettyjsonOptions));
        return "";
    }
};