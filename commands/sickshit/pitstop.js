module.exports = {
    name: "pitstop",
    category: "sickshit",
    permissions: [],
    devOnly: false,
    run: async ({Client, message, args}) => {
        const { joinVoiceChannel } = require('@discordjs/voice');
        if(!message.member.roles.cache.some(role => role.name === 'P1N1S Admin')) return message.reply("You don't have permission to do that, cunt");
        const pitchannel = Client.channels.cache.get("936608289251262515");
        const requester = message.member.voice.channel;
        Client.channels.cache.filter((c) => c.name === 'P1N1S PIT').forEach(channel => {
            channel.fetch().then((channel) => {
                for (let [snowflake, guildMember] of channel.members) {
                    if(guildMember.user.bot !== true){
                        guildMember.voice.setChannel(requester);
                    }
                }
            });
        });
        const connection3 = joinVoiceChannel({
            channelId: pitchannel.id,
            guildId: pitchannel.guild.id,
            adapterCreator: pitchannel.guild.voiceAdapterCreator,
        });

        const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Stop,
            },
        });
        connection3.subscribe(player);
        player.stop();
        connection3.destroy();
    }
}
