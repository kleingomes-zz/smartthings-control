const rp = require('request-promise');
const constants = require('../config/constants');
const prettyjson = require('prettyjson');
const stApi = 'https://api.smartthings.com/v1';
const prettyjsonOptions = {};

module.exports = {
    /**
     * Returns all SmartThings connected devices
     * @returns {Promise} A list of user devices.
     */
    listDevices: function() {
        const path = `/devices/?includeStatus=true`;
        const options = {
            url: `${stApi}${path}`,
            method: 'GET',
            json: true,
            headers: {
                'Authorization': constants.getBearerToken()
            }
        };
        console.log("List Devices:");
        console.log(prettyjson.render(options, prettyjsonOptions));
        return rp(options);
    },

    /**
     * Returns the status of a single capability of a device
     * @returns {Promise} A list of user devices.
     */
    getStatusForCapability: function(deviceId, capability) {
        const path = "devices/"+deviceId+"/components/main/capabilities/"+capability+"/status";
        const options = {
            url: `${stApi}${path}`,
            method: 'GET',
            json: true,
            headers: {
                'Authorization': constants.getBearerToken()
            }
        };
        return rp(options);
    },

    /**
     * Returns the status of all capabilities in a device
     * @returns {Promise} A full status of all the device capabilities
     */
    getFullDeviceStatus: function(deviceId) {
        const path = "/devices/"+deviceId+"/status";
        const options = {
            url: `${stApi}${path}`,
            method: 'GET',
            json: true,
            headers: {
                'Authorization': constants.getBearerToken()
            }
        };
        console.log("Device Status:");
        console.log(prettyjson.render(options, prettyjsonOptions));
        return rp(options);
    },

    /**
     * Builds and returns a Bluebird Request Promise to actuate a
     * SmartThings-connected device.
     *
     * @param {string} deviceId - the ID of the device to actuate.
     * @param {Object[]} commands - The commands request body to send.
     *
     * @returns {Promise} A request-promise for the request.
     */
    actuate: function(deviceId, commands) {
        const path = `/devices/${deviceId}/commands`;
        const options = {
            url: `${stApi}${path}`,
            method: 'POST',
            json: true,
            body: commands,
            headers: {
                'Authorization': constants.getBearerToken()
            }
        };
        console.log("Device command request:");
        console.log(prettyjson.render(options, prettyjsonOptions));
        return rp(options);
    }
};