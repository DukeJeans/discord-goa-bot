const DISCORD         = require('discord.js');

exports.getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}