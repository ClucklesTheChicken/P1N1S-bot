const Discord = require("discord.js");
const generateImage = require("../generateImage");

module.exports = {
    name: "guildMemberUpdate",
    run: async (bot, member) => {
        const ChannelID = "927448732922941462";
        if (member.roles.cache.some(role => role.name === 'P1N1S Admin')) {
            member.guild.channels.cache.get(ChannelID).send({
                content: `<@${member.id}>`+' Has been promoted to P1N1S Admin!!'
            })
        }
        else if (member.roles.cache.some(role => role.name === 'P1N1S')) {
            member.guild.channels.cache.get(ChannelID).send({
                content: `<@${member.id}>`+' Welcome to P1NAAAAAAAAAAAAAAAAAAAAASSSSSSSSSSS!!!!!!!!!'
            })
        }
    }
}