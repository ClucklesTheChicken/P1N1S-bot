module.exports = {
    name: "help",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({Client, message, args}) => {
        const { getFiles } = require("../../util/functions");
        const fs = require("fs");
        const prefix = "~";

        let commands = [];
        fs.readdirSync("./commands/").forEach((category) => {
            let commandsArr = getFiles(`./commands/${category}`,".js");
            //console.log(commandsArr);
            //console.log('yeet');
            // commandsArr.forEach((f) => {
            //     const command = require(`../commands/${category}/${f}`);
            //     Client.commands.set(command.name, command);
            // })
            if(commands.length == 0){
                commands = commandsArr.map(function(singleElement){
                    return prefix+singleElement.slice(0, -3);
                })
            }
            else{
                commandsArr = commandsArr.map(function(singleElement){
                    return prefix+singleElement.slice(0, -3);
                })
                commands = commands.concat(commandsArr);
            }
            

        });
        await sleep(1000);
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        
        commands = commands.map(function(singleElement){
            switch (singleElement) {
                case '~help':
                    return singleElement+' - You just used it.';
                case '~talk':
                    return singleElement+' - hit space after the command and say what you want to the bot. Eg. ~talk you are a poes';
                case '~disconnect':
                    return singleElement+' - Disconnects the bot from voice channel.';
                case '~pitstop':
                    return singleElement+' - Stops P1N1S Pit. Note: You have to be in a voice channel to use this command.'; 
                case '~prepit':
                    return singleElement+' - Starts Pre P1N1S Pit activities (the oath). Note: You have to be in a voice channel to use this command.';
                case '~ping':
                    return singleElement+' - Replies with pong. Idk what to tell you. It is useless.'; 
                case '~abriequote':
                    return singleElement+' - Replies with a random Abrie quote. Can be followed with a space and then "faggot" or "facts". Eg. ~abriequote faggot'; 
                case '~pitstart':
                    return singleElement+' - Starts P1N1S Pit activities. Follow this with @ mentions. Random text will not work. Eg. ~pitstart @user1 @user2'; 
                case '~postpit':
                    return singleElement+' - Starts Post Pit activities (celebration). Note: You have to be in a voice channel to use this command.'; 
                case '~timeout':
                    return singleElement+' - Times a user out. You need to mention a user/users with @ to use this command. Eg. ~timeout @user1 @user2'; 
                default:
                    return singleElement;
            }
        })
        // const EmbedBuilder = require("discord.js");
        // const embed = new EmbedBuilder()
        // .setTitle("Commands").
        // setDescription("List of commands for you cunts that can't remember shit.")
        // .addField("", commands.join("\n"))
        // .setColor("#00ff00")
        // .setThumbnail(message.author.avatarURL());

        const { EmbedBuilder } = require('discord.js');

        const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Commands')
        .setDescription("List of commands for you cunts that can't remember shit.")
        .setThumbnail(Client.user.displayAvatarURL())
        .addFields(
            { name: '----------', value: commands.join("\n\n") }
        )
        .setTimestamp();
        
        message.reply({embeds: [Embed]}); //Send an embed
    }
}
