const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=7b1088ecb7edd08bc28fca86c3e9d9ef&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
        " It is currently " +
        body.current.temperature +
        " degress out. It feels like " +
        body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
