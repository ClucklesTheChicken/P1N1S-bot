// ID: 1019232754946293850
// TOKEN: HIDDEN BITCH
// Invite Link: https://discord.com/oauth2/authorize?client_id=1019232754946293850&scope=bot&permissions=1
const Discord = require("discord.js");
require("dotenv").config();

const generateImage = require("./generateImage")

let randomkak = require("./randomkak.json");
const { default: WOKCommands } = require("wokcommands");
randomkak = JSON.parse(JSON.stringify(randomkak));
const Client = new Discord.Client({
    intents:["Guilds","GuildMessages","DirectMessages","MessageContent","GuildMembers"], partials: ["CHANNEL", "GUILD_MEMBER","MESSAGE","REACTION","USER"]
});

Client.on("ready", (function(client){
    console.log("Ready to do P1N1S things");
    const guildId = '1019232207321174036';
    const guild = client.guilds.cache.get(guildId);
    let commands
    if(guild){
        commands = guild.commands;
    }
    else{
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    });

    commands?.create({
        name: 'add',
        description: 'Adds kak together',
        options: [
            {
                name: 'num1',
                description: 'first number',
                required: true,
                type: 10 // NUMBER, 5 is BOOLEAN, 6 is USER, 3 is STRING
            },
            {
                name: 'num2',
                description: 'second number',
                required: true,
                type: 10 
            }
        ]
    });
}));


function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}

Client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()){
        return;
    }

    const { commandName, options } = interaction;

    if(commandName === 'ping'){
        interaction.reply({
            content: 'pong',
            ephemeral: true //only user can see it
        })
    }
    else if(commandName === 'add'){
        const num1 = parseInt(options.getNumber('num1')) || 0;
        const num2 = parseInt(options.getNumber('num2')) || 0;
        let sum = num1 + num2;
        interaction.reply({
            content: 'The sum is '+ sum
        });
    }
});

const WelcomeChannelID = "1019528882312982548";

Client.on("guildMemberAdd", async (member) =>{
    const img = await generateImage(member);
    member.guild.channels.cache.get(WelcomeChannelID).send({
        content: `<@${member.id}>`+' Welcome to the server!',
        files: [img]
    })
});


Client.on("messageCreate", async (message) =>{
    if(!message.author.bot){
        var voiceChannel = message.member.voiceChannel;
        // const img2 = await generateImage(message.member);
        // message.member.guild.channels.cache.get(WelcomeChannelID).send({
        //     // content: `<@${message.member.id}>`+' Welcome to the server!',
        //     files: [img2]
        // })
        if(message.content.indexOf("poes") !== -1){
            message.reply("no u are a poes");
        }
        else if(message.content.indexOf("hello") !== -1){
            message.reply("Hello");
        }
        else{
            message.reply("idk wtf you said, so I'm gonna say "+randomkak[between(0, Object.keys(randomkak).length)]); 
        }
        
    }
    
});



Client.login(process.env.TOKEN);

