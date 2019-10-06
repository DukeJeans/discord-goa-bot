const Discord = require('discord.js')
const client = new Discord.Client()

var wellMet
var fagVideo
var ghuun1
var ghuun2
var ghuun3
var ghuun4
var ghuun5
var generalChannel
var debugChannel
var khalid
var multiplayerChannel
var hook
var yurlqiCounter
var turtleVideo
var GhuunVersion = 1.8

token = 'NTUxMTQ5OTk3ODM2NzMwMzc0.XUDiLA.tQEtYMsNojFTCa7FvHtIOaCaV2I';

client.on("guildMemberAdd", member => {
    let guild = member.guild;

    debugChannel.send("Greeting new user: "+member.displayName +" Number Generated: " + randomNumber);

    var randomNumber = Math.random()*4;
    if(randomNumber < 1){
        generalChannel.send(`<:tortle:604685683285819402> A new turtle, ${member.user}, has made it to the Discord! <:tortle:604685683285819402>`).catch(console.error);
        generalChannel.send(turtleVideo);
    }
    else if(randomNumber < 2){
        generalChannel.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`).catch(console.error);
        generalChannel.send(wellMet);
    }
    else if(randomNumber < 3){
        generalChannel.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq. Another one :point_up: has made it to the Discord.`).catch(console.error);
        generalChannel.send(khalid);
    }
    else {
        generalChannel.send(`${member.user}, gul'kafh an'shel. Yoq'al shn ky ag nuul. Ag puul skshgn: on'ma yeh'glu zuq.`).catch(console.error);
        generalChannel.send(fagVideo);
    }

    if(member.displayName == "Yurlqi"){
        yurlqiCounter++;
        generalChannel.send(":arrow_up: Yurlqi Counter: "+yurlqiCounter);
    }
    console.log("Greeted User "+member.displayName +" Number Generated: "+randomNumber);

  });

client.on('guildMemberRemove',(member) => {
    generalChannel.send(`*consumes the soul of ${member.displayName}*`).catch(console.error);

    if(member.displayName == "Yurlqi"){
        yurlqiCounter--;
        generalChannel.send(":arrow_down: Yurlqi Counter: "+yurlqiCounter);
    }
});

client.on('message', (message) => { //Commands
    if (message.author == client.user) {
        return
    }

    if(message.content.toLowerCase() == "ghuun send nudes" || message.content.toLowerCase() == "g'huun send nudes" ){
        sendNudes(message)
    }
    if(message.content.toLowerCase().search("ghuun") != -1 || message.content.toLowerCase().search("g'huun") != -1)
    {
        reactWithGhuun(message)
    }
    if(message.content.toLowerCase().search("soon") != -1 && message.content.length == 4)
    {
        proclaimSoon(message)
    }
    else if(message.content.toLowerCase().search("when") != -1 && message.content.length == 4)
    {
        askSoon(message)
    }

    if (message.content.startsWith("g!")) {
        interpretCommand(message)
    }
});

function interpretCommand(message){

    let command = message.content.substr(2)
    let commandPieces = command.split(" ")
    let mainCommand = commandPieces[0]
    let arguments = commandPieces.slice(1)

    debugChannel.send("Command received: " + mainCommand)
    debugChannel.send("Arguments: " + arguments)

    if (mainCommand == "ping") {
        helpCommand(message)
    }
    if (mainCommand == "emoji") {
        emojiCommand(message)
    }
    if(mainCommand == "multiplayer"){
        multiplayerCommand(message)
    }
    if(mainCommand == "testPhrase"){
        testPhraseCommand(message)
    }
    if(mainCommand == "mphelp"){
        multiplayerHelp(message)
    }
    if(mainCommand == "mplobby"){
        lobbyCommand(message,arguments)
    }
    if(mainCommand == "gayforghuun"){
        speakCommand(message,message.content.substring(13))
    }
    if(mainCommand == "rate"){
        rateCommand(message,message.content.substring(6))
    }
}

function helpCommand (message){
    message.reply("Pong!");
}

function emojiCommand (message){
    message.reply("<:ghuun:535311429033787403>");
}

function testPhraseCommand(message) {
    debugChannel.send("has consumed the soul of "+ message.member.displayName);
}

function multiplayerHelp(message) {
    debugChannel.send(message.member.displayName + " has used g!mphelp");
    multiplayerChannel.send("Use `g!multiplayer` to join the @Multiplayer role for pings related to multiplayer games.")
    multiplayerChannel.send("Use `g!mplobby` create a multiplayer game and have it pinned to the channel. Please use this format: `g!mplobby (DAY) (dd/mm) (TIME in GMT)`.")
    multiplayerChannel.fetchMessages({ limit: 1 })
}

function multiplayerCommand (message){
    if(!message.member.roles.has('541061831045677095')){
        message.reply("you have been added to @Multiplayer! Za awtgsshu wgah uulg'ma ywaq zaix. :game_die:");
        message.member.addRole('541061831045677095');
	debugChannel.send(message.member.displayName + " was added to @Multiplayer.");
    }
    else{
        message.reply("you have been removed from @Multiplayer! Za awtgsshu wgah uulg'ma ywaq zaix. :game_die: :gun:");
        message.member.removeRole('541061831045677095');
	debugChannel.send(message.member.displayName + " was removed from @Multiplayer.");
    }
}

function lobbyCommand(message,arguments) {
    debugChannel.send(message.member.displayName + " has used g!mplobby")

    var mplobbyMessage = ":game_die: <@&541061831045677095>, " + message.member.displayName + " has scheduled a game for " + arguments[0]+ ", " + arguments[1] + " at " + arguments[2]+ " GMT. React with <:ghuun:535311429033787403> if you plan to join. :game_die:";
    
    multiplayerChannel.send(mplobbyMessage).then(message => {
        message.react(message.guild.emojis.get('535311429033787403'))
        message.pin();
    })
}

function rateCommand(message,strToRate){
    if(strToRate.search("@") != -1){
        message.channel.send("Don't ping people!");
        return;
    }
    var rating = hash(strToRate);
    rating = Math.abs(rating%11);
    if(strToRate.toLowerCase() === "ghuun" || strToRate.toLowerCase() === "g'huun")
        rating = 10;
    message.channel.send("<:archimondethinking:540320482449293320> | **"+message.member.displayName+"**, Il'zarq G'huun phgwa an'zig. I'd give"+strToRate+" a **"+rating+"/10**.");
}

function sendNudes(message) {
    var randomToken = Math.random()*4;

    debugChannel.send(message.member.displayName + " has asked for nudes. Token = " + randomToken);

    if(randomToken < 1) {
        message.channel.send(ghuun1);
    }
    else if(randomToken < 2) {
        message.channel.send(ghuun2);
    }
    else if(randomToken < 3) {
        message.channel.send(ghuun3);
    }
    else if(randomToken < 4) {
        message.channel.send(ghuun4);
    }
    else {
        message.channel.send(ghuun5);
    }
}

function reactWithGhuun(message) {
    debugChannel.send(message.member.displayName + " has mentioned G'huun.")
    message.react(message.guild.emojis.get('535311429033787403'))
}

function proclaimSoon (message) {
    debugChannel.send(message.member.displayName + " has said soon.")
    message.reply("SOOOOOOOOOON!")
}

function askSoon (message) {
    debugChannel.send(message.member.displayName + " has asked when?")
    message.reply(" 'kadiq \"soon\"")
}

function speakCommand (message,substring) {
    debugChannel.send(message.member.displayName + " is gay for G'huun. Message send is " + substring);
    message.channel.send(substring)
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

client.on('ready', () => { //G'huun Boot Sequence
    debugChannel = client.channels.find(ch => ch.name === 'ghuun-debug');
    wellMet = new Discord.Attachment('WELLMET.png')
    debugChannel.send("Wellmet.png loaded...");
    fagVideo = new Discord.Attachment('Fag.mp4')
    debugChannel.send("Fag.mp4 loaded...");
    turtleVideo = new Discord.Attachment('turtle.mp4')
    debugChannel.send("turtle.mp4 loaded...");
    khalid = new Discord.Attachment('khalid.gif')
    debugChannel.send("khalid.gif loaded...");
    ghuun1 = new Discord.Attachment('Ghuun1.png')
    debugChannel.send("Ghuun1.png loaded...");
    ghuun2 = new Discord.Attachment('Ghuun2.png')
    debugChannel.send("Ghuun2.png loaded...");
    ghuun3 = new Discord.Attachment('Ghuun3.png')
    debugChannel.send("Ghuun3.png loaded...");
    ghuun4 = new Discord.Attachment('Ghuun4.png')
    debugChannel.send("Ghuun4.png loaded...");
    ghuun5 = new Discord.Attachment('Ghuun5.png')
    debugChannel.send("Ghuun5.png loaded...");
    ghuun = client.user;
    debugChannel.send("G'huun user ID saved...");
    yurlqiCounter = 24
    console.log("Yurlqis set to " + yurlqiCounter + "...");
    debugChannel.send("G'huun Version is "+GhuunVersion);

    generalChannel = client.channels.find(ch => ch.name === 'general');

    multiplayerChannel = client.channels.find(ch => ch.name === 'multiplayer');
    
    debugChannel.send("G'huun startup successful!");

    hook = new Discord.WebhookClient('webhook id', 'webhook token');

});

client.login(token);