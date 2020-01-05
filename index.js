const DISCORD         = require('discord.js');
const TOOLS           = require('./bin/bot-functions');
const TOKEN           = require('./bin/token');
const COMMAND_HANDLER = require('./bin/command-handler')
const MEDIA           = require('./bin/media-service');
const CLIENT          = new DISCORD.Client();

CLIENT.login(TOKEN.key);

GENERAL_CHANNEL     = null;
MULTIPLAYER_CHANNEL = null;
DEBUG_CHANNEL       = null;

GhuunVersion = "3.0.1";

CLIENT.on("guildMemberAdd", member => {
    greetMember(member);
});

CLIENT.on('guildMemberRemove',(member) => {
    consumeMember(member);
});

CLIENT.on('message', (message) => { //Command Listener
    
    if (message.author == CLIENT.user) {
        return;
    }
    
    COMMAND_HANDLER.processCommand(message);
});

function consumeMember(member) {
    GENERAL_CHANNEL.send(`*consumes the soul of ${member.displayName}*`)
}

function greetMember(member) {
    guild = member.guild;

    var randomToken = TOOLS.getRandomInt(5);
    
    switch(randomToken){
        case 0:  GENERAL_CHANNEL.send(`<:tortle:604685683285819402> A new turtle, ${member.user}, has made it to the Discord! <:tortle:604685683285819402>`);
                 GENERAL_CHANNEL.send(MEDIA.turtleVideo); break;
        case 1:  GENERAL_CHANNEL.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`)
                 GENERAL_CHANNEL.send(MEDIA.wellMet); break;
        case 2:  GENERAL_CHANNEL.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq. Another one :point_up: has made it to the Discord.`)
                 GENERAL_CHANNEL.send(MEDIA.khalid); break;
        case 3:  GENERAL_CHANNEL.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`)
                 GENERAL_CHANNEL.send(MEDIA.knightVideo); break;
        default: GENERAL_CHANNEL.send(`<:whip:562757939765575705> ${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. <:whip:562757939765575705>`)
                 GENERAL_CHANNEL.send(MEDIA.whip); break;
    }
}

function hash(strToHash) {
    var hash = 0;
    if (strToHash.length == 0) {
        return hash;
    }
    for (var i = 0; i < strToHash.length; i++) {
        var char = strToHash.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function setBotPresence() {
    CLIENT.user.setStatus('available');
    CLIENT.user.setPresence({
        game: {
            name: 'over the slaves',
            type: "WATCHING",
            url:  "https://github.com/DukeJeans/discord-goa-bot"
        }
    })
}

CLIENT.on('ready', () => { //G'huun Boot Sequence
    console.log("G'huun startup successful!");
    GENERAL_CHANNEL     = CLIENT.channels.get('317370095024209920');
    DEBUG_CHANNEL       = CLIENT.channels.get('606131458549219328');
    MULTIPLAYER_CHANNEL = CLIENT.channels.get('540582116832837632');
    console.log('Channels loaded.');
    setBotPresence();
    GENERAL_CHANNEL.send("**G'huun Online: Version "+GhuunVersion+"**");
});