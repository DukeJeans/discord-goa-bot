const Discord   = require('discord.js');
const Utilities = require('./ghuunUtilities');
const Token     = require('./token'); //Imports G'huun client secret from untracked file
const client    = new Discord.Client()

wellMet     = new Discord.Attachment('WELLMET.png')
fagVideo    = new Discord.Attachment('video.mp4')
turtleVideo = new Discord.Attachment('turtle.mp4')
khalid      = new Discord.Attachment('khalid.gif')
whip        = new Discord.Attachment('whip.mp4')
ghuun1      = new Discord.Attachment('Ghuun1.png')
ghuun2      = new Discord.Attachment('Ghuun2.png')
ghuun3      = new Discord.Attachment('Ghuun3.png')
ghuun4      = new Discord.Attachment('Ghuun4.png')
ghuun5      = new Discord.Attachment('Ghuun5.png')
ghuun6      = new Discord.Attachment('Ghuun6.png')
ghuun = client.user;
var generalChannel = client.channels.find(ch => ch.name === 'general');
multiplayerChannel = client.channels.find(ch => ch.name === 'multiplayer');

GhuunVersion = "2.3.1";

client.on("guildMemberAdd", member => {
    greetMember(member);
});

client.on('guildMemberRemove',(member) => {
    consumeMember(member);
});

client.on('message', (message) => { //Command Listener
    processCommand(message);
});

function consumeMember(member) {
    generalChannel.send(`*consumes the soul of ${member.displayName}*`)
}

function greetMember(member) {
    guild = member.guild;

    var randomToken = Utilities.getRandomInt(5);
    
    switch(randomToken){
        case 0:  generalChannel.send(`<:tortle:604685683285819402> A new turtle, ${member.user}, has made it to the Discord! <:tortle:604685683285819402>`);
                 generalChannel.send(turtleVideo); break;
        case 1:  generalChannel.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`)
                 generalChannel.send(wellMet); break;
        case 2:  generalChannel.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq. Another one :point_up: has made it to the Discord.`)
                 generalChannel.send(khalid); break;
        case 3:  generalChannel.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`)
                 generalChannel.send(fagVideo); break;
        default: generalChannel.send(`<:whip:562757939765575705> ${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. <:whip:562757939765575705>`)
                 generalChannel.send(whip); break;
    }
}

function processCommand(message) {
    var saidSoon     = (message.content.toLowerCase().search("soon") != -1 && message.content.length == 4);
    var saidWhen     = (message.content.toLowerCase().search("when") != -1 && message.content.length == 4);
    var saidGhuun    = (message.content.toLowerCase().search("ghuun") != -1 || message.content.toLowerCase().search("g'huun") != -1);
    var askedForPics = (message.content.toLowerCase() == "ghuun send nudes" || message.content.toLowerCase() == "g'huun send nudes");
    var isCommand    = (message.content.startsWith("g!"));

    if (message.author == client.user) {
        return;
    }
    if(askedForPics){
        sendNudes(message)
    }
    if (saidGhuun)
    {
        reactWithGhuun(message)
    }
    if (saidSoon)
    {
        proclaimSoon(message)
    }
    else if (saidWhen)
    {
        askSoon(message)
    }
    if (isCommand)
    {
        interpretCommand(message)
    }
}

function interpretCommand(message){

    var command = message.content.substr(2)
    var commandPieces = command.split(" ")
    var mainCommand = commandPieces[0]
    var arguments = commandPieces.slice(1)

    switch(mainCommand){
        case "ping":        helpCommand(message); break;
        case "emoji":       emojiCommand(message); break;
        case "multiplayer": multiplayerCommand(message); break;
        case "mphelp":      multiplayerHelp(message); break;
        case "mplobby":     lobbyCommand(message,arguments); break;
        case "gayforghuun": speakCommand(message,message.content.substring(13)); break;
        case "rate":        rateCommand(message,message.content.substring(6)); break;
        case "rule1":       ruleOne(message); break;
        case "rule2":       ruleTwo(message); break;
        case "rule3":       ruleThree(message); break;
        case "rule4":       ruleFour(message); break;
        case "rule5":       ruleFive(message); break;
        default:            commandError(message);
    }
}

function commandError(message){
    message.channel.send("Command not recognized.");
}

function helpCommand (message){
    message.reply("Pong!");
}

function emojiCommand (message){
    message.reply("<:ghuun:535311429033787403>");
}

function multiplayerHelp(message) {
    console.log(message.member.displayName + " has used g!mphelp");
    multiplayerChannel.send("Use `g!multiplayer` to join the @Multiplayer role for pings related to multiplayer games.")
    multiplayerChannel.send("Use `g!mplobby` create a multiplayer game and have it pinned to the channel. Please use this format: `g!mplobby (DAY) (dd/mm) (TIME in GMT)`.")
    multiplayerChannel.fetchMessages({ limit: 1 })
}

function multiplayerCommand (message){
    if(!message.member.roles.has('541061831045677095')){
        message.reply("you have been added to @Multiplayer! Za awtgsshu wgah uulg'ma ywaq zaix. :game_die:");
        message.member.addRole('541061831045677095');
	console.log(message.member.displayName + " was added to @Multiplayer.");
    }
    else{
        message.reply("you have been removed from @Multiplayer! Za awtgsshu wgah uulg'ma ywaq zaix. :game_die: :gun:");
        message.member.removeRole('541061831045677095');
	console.log(message.member.displayName + " was removed from @Multiplayer.");
    }
}

function lobbyCommand(message,arguments) {
    console.log(message.member.displayName + " has used g!mplobby")

    var mplobbyMessage = ":game_die: <@&541061831045677095>, " + message.member.displayName + " has scheduled a game for " + arguments[0]+ ", " + arguments[1] + " at " + arguments[2]+ " GMT. React with <:ghuun:535311429033787403> if you plan to join. :game_die:";
    
    multiplayerChannel.send(mplobbyMessage).then(message => {
        message.react(message.guild.emojis.get('535311429033787403'))
        message.pin();
    })
}

function rateCommand(message,strToRate){
    var rating = hash(strToRate);
    rating = Math.abs(rating%11);
    if(strToRate.toLowerCase() === "ghuun" || strToRate.toLowerCase() === "g'huun")
        rating = 10;
    message.channel.send("<:archimondethinking:540320482449293320> | **"+message.member.displayName+"**, Il'zarq G'huun phgwa an'zig. I'd give"+strToRate+" a **"+rating+"/10**.");
}

function sendNudes(message) {
    var randomToken = Utilities.getRandomInt(6);

    switch(randomToken){
        case 0:  message.channel.send(ghuun1); break;
        case 1:  message.channel.send(ghuun2); break;
        case 2:  message.channel.send(ghuun3); break;
        case 3:  message.channel.send(ghuun4); break;
        case 4:  message.channel.send(ghuun5); break;
        default: message.channel.send(ghuun6); break;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function reactWithGhuun(message) {
    message.react(message.guild.emojis.get('535311429033787403'))
}

function proclaimSoon (message) {
    message.reply("SOOOOOOOOOON!")
}

function askSoon (message) {
    message.reply(" 'kadiq \"soon\"")
}

function speakCommand (message,substring) {
    message.channel.send(substring);
    message.delete();
}

function ruleOne (message) {
    message.channel.send("Rule 1: Don't be a dick.");
    message.delete();
}

function ruleTwo (message) {
    message.channel.send("Rule 2: Targeted harassment of others and general spaminess is not tolerated.");
    message.delete();
}

function ruleThree (message) {
    message.channel.send("Rule 3: Keep NSFW stuff in #toxic-lounge.");
    message.delete();
}

function ruleFour (message) {
    message.channel.send("Rule 4: Scenes of zoophilia, necrophilia, death, child porn, disfigurement, and guro are completely prohibited.");
    message.delete();
}

function ruleFive (message) {
    message.channel.send("Rule 5: Don't go breaking the Discord ToS.");
    message.delete();
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
    client.user.setStatus('available');
    client.user.setPresence({
        game: {
            name: 'over the slaves',
            type: "WATCHING",
            url:  "https://github.com/DukeJeans/discord-goa-bot"
        }
    })
}

client.on('ready', () => { //G'huun Boot Sequence
    generalChannel = client.channels.find(ch => ch.name === 'general');
    console.log("G'huun startup successful!");
    generalChannel.send("**G'huun Online: Version "+GhuunVersion+"**");
    setBotPresence();
});

client.login(Token.key);