module.exports = {
    name: "disconnect",
    category: "sickshit",
    permissions: [],
    devOnly: false,
    run: async ({Client, message, args}) => {
        const { joinVoiceChannel } = require('@discordjs/voice');
        const voice = require('@discordjs/voice');
        const pitchannel = Client.channels.cache.get("936608289251262515");
        const requester = message.member.voice.channel;
        
        const connection2 = joinVoiceChannel({
            channelId: requester.id,
            guildId: requester.guild.id,
            adapterCreator: requester.guild.voiceAdapterCreator,
        });

        const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Stop,
            },
        });
        connection2.subscribe(player);
        player.stop();
        voice.getVoiceConnection(requester.guild.id).disconnect();
    }
}
