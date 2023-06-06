// ID: 1019232754946293850
// TOKEN: HIDDEN BITCH
// Invite Link: https://discord.com/oauth2/authorize?client_id=1019232754946293850&scope=bot&permissions=1

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
  });

const Discord = require("discord.js");
require("dotenv").config();

const Client = new Discord.Client({
    intents:["Guilds","GuildMessages","DirectMessages","MessageContent","GuildMembers","GuildVoiceStates","GuildPresences","GuildIntegrations"], partials: ["CHANNEL", "GUILD_MEMBER","MESSAGE","REACTION","USER"]
});

let bot = {
    Client,
    prefix: "~",
    owners: ["267419212710936578"]
}

Client.commands = new Discord.Collection();
Client.events = new Discord.Collection();

Client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
Client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

Client.loadEvents(bot, false);
Client.loadCommands(bot, false);

module.exports = bot;

// PULL CUNTS INTO PIT FIRST THEN MUSIC IF YOU WANT TO CALL IT THAT

// Client.on("ready", (function(client){
//     const guildId = '267420294552092674';
//     const guild = client.guilds.cache.get(guildId);
//     let commands
//     if(guild){
//         commands = guild.commands;
//     }
//     else{
//         commands = client.application?.commands;
//     }


//     commands?.create({
//         name: 'add',
//         description: 'Adds kak together',
//         options: [
//             {
//                 name: 'num1',
//                 description: 'first number',
//                 required: true,
//                 type: 10 // NUMBER, 5 is BOOLEAN, 6 is USER, 3 is STRING
//             },
//             {
//                 name: 'num2',
//                 description: 'second number',
//                 required: true,
//                 type: 10 
//             }
//         ]
//     });
// }));



// Client.on('voiceStateUpdate', (oldMember, newMember) => {
//     let newUserChannel = newMember.voiceChannel
//     let oldUserChannel = oldMember.voiceChannel
  
  
//     if(oldUserChannel === undefined && newUserChannel !== undefined) {
  
//        // User Joins a voice channel
//        console.log("user joined channel")
//     } else if(newUserChannel === undefined){
  
//       // User leaves a voice channel
//       console.log("user left channel")
//     }
//   });




Client.login(process.env.TOKEN);

