const api = "https://yv1x0ke9cl.execute-api.us-east-1.amazonaws.com/prod/events";
const auth_info = require("./config");
const rp = require('request-promise');
/*
Helper for calling API
 */
let auth = 'Basic '+ new Buffer(auth_info.username + ":" + auth_info.password).toString("base64");

const headers = {
    'Authorization': auth,
    'Content-Type':  'application/json'
};

const get = async (pref="", genreId="") => {
    const uri = `${api}?classificationName=${pref}&genreId=${genreId}`;
    const options = {
        uri,
        headers,
        json: true
    };

    return rp(options).then(res => res)
};

module.exports = get;