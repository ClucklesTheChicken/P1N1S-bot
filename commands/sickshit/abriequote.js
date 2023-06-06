module.exports = {
    name: "abriequote",
    category: "sickshit",
    permissions: [],
    devOnly: false,
    run: async ({ Client, message, args }) => {
        try {
            const { joinVoiceChannel } = require('@discordjs/voice');
            const voice = require('@discordjs/voice');
            const fs = require("fs");
            const requester = message.member.voice.channel;
            if (!requester) return console.error("The channel does not exist!");
            //if(!message.member.roles.cache.some(role => role.name === 'P1N1S Admin')) return message.reply("You don't have permission to do that, cunt");

            var abrieQuotes = [];
            fs.readdir("./audio/abrie/", (err, files) => {
                abrieQuotes = files.map(function (singleElement) {
                    return './audio/abrie/' + singleElement;
                })
            });
            await sleep(1000);

            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }
            function between(min, max) {
                return Math.floor(
                    Math.random() * (max - min) + min
                )
            }

            const connection5 = joinVoiceChannel({
                channelId: requester.id,
                guildId: requester.guild.id,
                adapterCreator: requester.guild.voiceAdapterCreator,
            });

            await sleep(2000);


            const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Stop,
                },
            });
            let resource = null;
            if (args[0] == 'faggot') {
                resource = createAudioResource('./audio/abrie/what is that songs name.mp3', { inlineVolume: true });
                resource.volume.setVolume(1);
            }
            else if (args[0] == 'facts') {
                resource = createAudioResource('./audio/abrie/fun facts.mp3', { inlineVolume: true });
                resource.volume.setVolume(1);
            }
            else if (args[0] == 'gentle') {
                resource = createAudioResource('./audio/abrie/gentlekak.mp3', { inlineVolume: true });
                resource.volume.setVolume(2);
            }
            else if (args[0] == 'fish') {
                resource = createAudioResource('./audio/abrie/fish.mp3', { inlineVolume: true });
                resource.volume.setVolume(2);
            }
            else {
                resource = createAudioResource(abrieQuotes[between(0, abrieQuotes.length)], { inlineVolume: true });
                resource.volume.setVolume(2);
            }



            connection5.subscribe(player);
            player.play(resource);


            player.on('stateChange', (oldState, newState) => {

                if(oldState.status === AudioPlayerStatus.Playing && newState.status === AudioPlayerStatus.Idle){
                    console.log('The audio player switched from playing to Idle');
                    player.stop();
                    voice.getVoiceConnection(requester.guild.id).disconnect();
                }
                if(newState.status === AudioPlayerStatus.Buffering){
                    console.log('buffering bitch');
                }
    
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
        catch (error) {
            console.error(error);
        }

    }
}
