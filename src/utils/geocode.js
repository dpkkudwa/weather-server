const request = require('postman-request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGt1ZHdhIiwiYSI6ImNrOHd5azkweDBybWkzbGxkbmNlc2s5b2sifQ.vfSmRZ5uVnTnPMK2lg6NlA&limit=1';
  request({url, json: true}, (error, response, {features}) => {
    if (error) {
      callback('Geocoding API is not accessible!!', undefined);
    }
    else if (features.length === 0) {
      callback('Invalid Query Parameter.', undefined);
    }
    else {
      callback(undefined, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name
      });
    }
  })
}

module.exports = geocode;
