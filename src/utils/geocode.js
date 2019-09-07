const request = require('request');

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoidG9mYXp6YWxzaHV2byIsImEiOiJjanloYnV0NmcwYTZkM2RtNjFpYTJkZG9kIn0.XoKlQuQYswAbRfyamwABFw';
    request({url, json: true}, (err, response)=>{
        if(err){
            callback('Unable to connect to the server!');
        }else if(response.body.features.length === 0){
            callback(`"${address}" not found. Try another search!`);
        }
        else callback(err, response.body.features[0]);
    });
}

module.exports = geocode;