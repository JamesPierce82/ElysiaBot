var apiai = require('apiai');
// Import all settings from the conf.js file
let settings = require('./conf.js');

// Declare variables from the conf.js file
const token = settings.token;
const apiToken = settings.apiToken;

var app = apiai(apiToken);

var request = app.textRequest('hello', {
    sessionId: 'testID'
});

request.on('response', function(response){
    console.log(response.result.fulfillment.speech);
});

request.on('error', function(error){
    console.log(error);
});

request.end();