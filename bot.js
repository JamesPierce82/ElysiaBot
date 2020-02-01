#!/usr/bin/env node
/**
 * A custom bot built by James Pierce for various personal Discord Servers.
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();


function diceArray(message, diceArray){
    
    message.channel.send("Successfully entered the diceArray method!");
}

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Import all settings from the conf.js file
let settings = require('./conf.js');

// Declare variables from the conf.js file
const token = settings.token;

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
  // If the message is "ping"
  if (message.content === '!ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
      // Zak Logic
  } else if(message.content === '!roll'){
        var rollStringArray = message.content.split(" ");
        var rollString = rollStringArray[1];
      
        var diceArray = rollString.split("+");
        rollDice(message, diceArray);
    
  } else if(message.author.id === '278317411441180672') {
      if(zakMsg == 0){
		zakMsg = message.createdTimestamp;
	} else{
		zakOldMsg = zakMsg;
		zakMsg = message.createdTimestamp;
		zakTimeout = zakMsg - zakOldMsg;
		if(zakTimeout > 900000){
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
  } else if(message.content === '!dan'){
      message.channel.send("danMsg - " + danMsg);
      message.channel.send("danOldMsg - " + danOldMsg);
      message.channel.send("danTimeout - " + danTimeout);
  } else if(message.content === '!zak'){
      message.channel.send("zakMsg - " + zakMsg);
      message.channel.send("zakOldMsg - " + zakOldMsg);
      message.channel.send("zakTimeout - " + zakTimeout);
  } else if(message.content === '!help'){
        message.channel.send("Command List
                             \n
                             \n!help - Lists all commands
                             \n!roll - Rolls Dice(WIP)");
  }
});


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);
