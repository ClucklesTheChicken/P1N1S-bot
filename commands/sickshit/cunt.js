module.exports = {
    name: "cunt",
    category: "sickshit",
    permissions: [],
    devOnly: false,
    run: async ({Client, message, args}) => {
        const { joinVoiceChannel } = require('@discordjs/voice');
        const voice = require('@discordjs/voice');

        const requester = message.member.voice.channel;
        if (!requester) return console.error("The channel does not exist!");
        if(!message.member.roles.cache.some(role => role.name === 'P1N1S Admin')) return message.reply("You don't have permission to do that, cunt");
        const connection = joinVoiceChannel({
            channelId: requester.id,
            guildId: requester.guild.id,
            adapterCreator: requester.guild.voiceAdapterCreator,
        });

        await sleep(2000);
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Stop,
            },
        });

        const resource = createAudioResource('./audio/cunt.mp3', { inlineVolume: true });
        resource.volume.setVolume(1.5);

        connection.subscribe(player);
        player.play(resource);

        player.on('stateChange', (oldState, newState) => {

            if(oldState == AudioPlayerStatus.Playing && newState == AudioPlayerStatus.Idle){
                console.log('The audio player switched from playing to Idle');
                player.stop();
                voice.getVoiceConnection(requester.guild.id).disconnect();
            }
            console.log(oldState,newState);

        });
        player.on('error', error => {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        });

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing!');
        });
        // player.on(AudioPlayerStatus.Idle, () => {
        //     console.log('The audio player is Idle');
        //     player.stop();
        //     voice.getVoiceConnection(requester.guild.id).disconnect();
        // });
        player.on(AudioPlayerStatus.Buffering, () => {
            console.log('The audio player is buffering');
        });
        player.on(AudioPlayerStatus.AutoPaused, () => {
            console.log('The audio player is autopaused!');
        });
        player.on(AudioPlayerStatus.Paused, () => {
            console.log('The audio player is paused!');
        });
        
    }
}
