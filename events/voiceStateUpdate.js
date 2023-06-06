const Discord = require("discord.js");

module.exports = {
    name: "voiceStateUpdate",
    run: async (bot, oldMember, newMember) => {
        const {Client, prefix} = bot;
        let newUserChannel = newMember.voiceChannel
        let oldUserChannel = oldMember.voiceChannel
        if (oldMember.member.user.bot) return;
        else if(oldMember.channelId === newMember.channelId) {
            console.log('user didnt move');
            return
        }
        else if(newMember.channelId == '936608289251262515') {
            console.log('user went to pit');
            return
        }
        else if(oldUserChannel === undefined && newUserChannel !== undefined) {
            console.log('user joined channel');
        // User Joins a voice channel
        return
        } else if(newUserChannel === undefined){
        // User leaves a voice channel
        console.log("user left channel");
        const { joinVoiceChannel } = require('@discordjs/voice');
        const voice = require('@discordjs/voice');

        const requester = oldMember;
        
        if (!requester) return console.error("The channel does not exist!");
        const connection = joinVoiceChannel({
            channelId: oldMember.channelId,
            guildId: oldMember.guild.id,
            adapterCreator: oldMember.guild.voiceAdapterCreator,
        });

        await sleep(2000);
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        const { createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

        const player = createAudioPlayer();

        const resource = createAudioResource('./audio/cunt.mp3', { inlineVolume: true });
        resource.volume.setVolume(1.5);
        if(connection.subscribe(player)){
            player.play(resource);
        }
        player.on('error', error => {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        });

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing!');
        });
        player.on(AudioPlayerStatus.Idle, () => {
            console.log('The audio player is Idle');
            player.stop();
            voice.getVoiceConnection(oldMember.guild.id).disconnect();
        });
        }
    }
}
