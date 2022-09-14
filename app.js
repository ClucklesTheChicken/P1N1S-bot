// ID: 1019232754946293850
// TOKEN: HIDDEN BITCH
// Invite Link: https://discord.com/oauth2/authorize?client_id=1019232754946293850&scope=bot&permissions=1
const Discord = require("discord.js");
require("dotenv").config();

const Client = new Discord.Client({
    intents:["Guilds","GuildMessages","DirectMessages","MessageContent","GuildMembers"], partials: ["CHANNEL", "GUILD_MEMBER","MESSAGE","REACTION","USER"]
});

let bot = {
    Client,
    prefix: "/p1n",
    owners: ["267419212710936578"]
}

Client.commands = new Discord.Collection();
Client.events = new Discord.Collection();

Client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
Client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

Client.loadEvents(bot, false);
Client.loadCommands(bot, false);

module.exports = bot;

// Client.on("ready", (function(client){
//     const guildId = '1019232207321174036';
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








Client.login(process.env.TOKEN);

