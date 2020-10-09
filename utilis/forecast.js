const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f9f10baf73774ec09f1491bd917de5da&query=${latitude},${longitude}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, response.body.current);
        }
    });
}

module.exports = {
    forecast: forecast
};