#!/usr/bin/env node
/**
 * A custom bot built by James Pierce for various personal Discord Servers.
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

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
  } else if(message.author.id === '278317411441180672') {
	zakMsg++;
	if(zakMsg == 1){
		// Send "fenton" when Zak sens messages
		message.channel.send('FENTON!');
	} else if(zakMsg == 5){
		zakMsg = 0;
	}
  } else if (message.author.id === '237788874271752192') {
	if(danMsg == 0){
		danMsg = message.createdTimestamp;
	} else{
		danOldMsg = jamesMsg;
		danMsg = message.createdTimestamp;
		danTimeout = danMsg - danOldMsg;
		if(danTimeout > 14400000){
			message.channel.send("Ugh, This guy? I'm Leaving...");
		}
	}
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);
