const Discord = require("discord.js");
const generateImage = require("../generateImage");

module.exports = {
    name: "guildMemberAdd",
    run: async (bot, member) => {
        const {Client, prefix} = bot;
        const WelcomeChannelID = "927606306678915112";
        const img = await generateImage(member);
        member.guild.channels.cache.get(WelcomeChannelID).send({
            content: `<@${member.id}>`+' Welcome to the server!',
            files: [img]
        })
    }
}