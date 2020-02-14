#!/usr/bin/env node
/**
 * A custom bot built by James Pierce for various personal Discord Servers.
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();


// Import all settings from the conf.js file
let settings = require('./conf.js');

// Declare variables from the conf.js file
const token = settings.token;
const apiToken = settings.apiToken;

const apiaiApp = require("apiai")(apiToken);


function roll(message, rollString){
    var output = "";
    var tempRoll = 0;
    var totalRoll = 0;
    
    var preRoll = message.content.split(" ");
    // cup represents the pool of dice being rolled, as in rolling a cup of Dice in Yahtzee
    var cup = preRoll[1].split("+");
    
    
    
    for(var i = 0; i < cup.length; i++){
        var dice = cup[i].split("d");
        var die = 0;
        if(!dice[0]){
            die = 1;
        } else {
            die = dice[0];
        }
        for(var j = 0; j < dice[0];j++){             
            tempRoll = Math.floor((Math.random() * dice[1])+1);
            if(j == 0 && i == 0){
                output += "(" + tempRoll + ")";
            } else {
                output += "+(" + tempRoll + ")";
            }
            totalRoll += tempRoll;
        }
    }
    
    
    
    message.channel.send("You rolled : " + output + " which is equal to : " + totalRoll);
    
}

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
    // Notify users on server of Bot Connect
    let debugChannel = client.guilds
        .find(x => x.name === 'DiegoAtravesar').channels
        .find(x => x.name === 'bot-log');
    
    debugChannel.send("Bot has Connected!");
    
    /*var apiai2 = require('apiai');
    var app2 = apiai(apiToken);
    var request = app2.textRequest('hello', {
        sessionId: 'testing'
    });
    request.on('response', function(response){
        debugChannel.send("response");
    });
    request.on('error', function(error){
        debugChannel.send(error);
    });
    request.end();*/

});


// declare variables tied to messaging features
var zakMsg = 0;
var zakOldMsg = 0;
var zakTimeout = 0;
var danMsg = 0;
var danOldMsg = 0;
var danTimeout = 0;
var jamesMsg = 0;
// Create an event listener for messages
client.on('message', message => {
    
    let debugChannel = client.guilds
        .find(x => x.name === 'DiegoAtravesar').channels
        .find(x => x.name === 'bot-log');
    
    let requestsChannel = client.guilds
        .find(x => x.name === 'DiegoAtravesar').channels
        .find(x => x.name === 'bot-requests');
    
    
    // Timer Logic
    if(message.author.id === '278317411441180672') {
      if(zakMsg == 0){
		zakMsg = message.createdTimestamp;
	} else{
		zakOldMsg = zakMsg;
		zakMsg = message.createdTimestamp;
		zakTimeout = zakMsg - zakOldMsg;
		if(zakTimeout > 1100000){
			message.channel.send("FENTON!");
		}
	}
      // Dan Logic
  } else if (message.author.id === '237788874271752192') {
	if(danMsg == 0){
		danMsg = message.createdTimestamp;
	} else{
		danOldMsg = danMsg;
		danMsg = message.createdTimestamp;
		danTimeout = danMsg - danOldMsg;
		if(danTimeout > 14400000){
			message.channel.send("Ugh, This guy? I'm Leaving...");
		}
	}
  }
    
    
  // If the message is "ping"
  if(message.content.startsWith(".")){
     let apiai = apiaiApp.textRequest(message.content.substr(1,message.content.length-1), {
         sessionId: 'robi' // arbitrary value
     });
      
      apiai.on('response', (response) => {
         /*message.channel.send("message was received successfully."); 
         let textResponse = response.result.fulfillment.speech;
          message.channel.send("message:" + textResponse); */
      });
      message.channel.send("apiAI has been created without error, response code is started.");
      message.channel.send("" + message.content.substr(1,message.content.length-1));
  } else if (message.content === '!ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
      // Zak Logic
  } else if(message.content.startsWith('!roll')){
        var rollStringArray = message.content.split(" ");
        var rollString = rollStringArray[1];
        roll(message, rollString);
  } else if(message.content === '!dan'){
      message.channel.send("danMsg - " + danMsg);
      message.channel.send("danOldMsg - " + danOldMsg);
      message.channel.send("danTimeout - " + danTimeout);
  } else if(message.content === '!zak'){
      message.channel.send("zakMsg - " + zakMsg);
      message.channel.send("zakOldMsg - " + zakOldMsg);
      message.channel.send("zakTimeout - " + zakTimeout);
  } else if(message.content === '!help'){
        message.channel.send("Command List\n\n!help - Lists all commands\n!roll - Rolls Dice using the following notation: 3d6+4d20\n!request - Type up any feature requests for the bot");
  }else if (message.content.startsWith("!request")){
      var request = message.content.substr(9, (message.content.length)-1);      
      requestsChannel.send("Request: " + request);
      message.channel.send("Your request has been logged. Thank You!");
  } else if (message.content.toLowerCase().includes("hey robi") && message.content.toLowerCase().includes("weather")){
    message.channel.send("Looks like showers. Boy do I need one.");
    message.channel.send("I promise I'll get smarter  soon and have better comebacks. This is the only thing I can think of currently.");
  }
});


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);


