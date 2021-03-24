const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=43f8d5e86f2da02e651df1a9683da8a7&query=' + latitude +',' + longitude + '&units=f';
  request({url, json: true}, (error, response, body) => {
    if (error) {
      callback('WeatherStack API is not accessible!!', undefined);
    }
    else if (body.error) {
      callback(body.error.info, undefined);
    }
    else {
      callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degress out.Feels like ' + body.current.feelslike +' degrees out.')
    }
  })
}

module.exports = forecast;
