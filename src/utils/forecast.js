const request = require('request');

const forecast = (latitutde, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d25dd05b556d34794b90fb2c09c9cf75/'+latitutde + ','+longitude
    //url : url
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location')
        }
        else {
            callback(undefined, {
                tempMin: body.daily.data[0].temperatureMin,
                tempMax: body.daily.data[0].temperatureMax,
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability
            })
       }
    })
}


module.exports = forecast