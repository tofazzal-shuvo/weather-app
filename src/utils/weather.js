const request = require('request');

const wather = (address, lattLongi, callback)=>{
    const url = `https://api.darksky.net/forecast/6e30ab78bc490a384ad8503ea4c9b403/${lattLongi[1]},${lattLongi[0]}?units=si`
    request({url, json: true}, (err, res)=>{
        if(err){
            callback('Unable to connect to the server!');
        }else if(res.body.error){
            callback(res.body.error);
        }
        else callback(err, res.body, address);
    });
}

module.exports = wather;