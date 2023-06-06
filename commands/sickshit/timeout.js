module.exports = {
    name: "timeout",
    category: "sickshit",
    permissions: [],
    devOnly: false,
    run: async ({Client, message, args}) => {
        const { joinVoiceChannel } = require('@discordjs/voice');
        const voice = require('@discordjs/voice');

        const pitchannel = Client.channels.cache.get("936608289251262515");
        if (!pitchannel) return console.error("The channel does not exist!");
        if(!message.member.roles.cache.some(role => role.name === 'P1N1S Admin')) return message.reply("You don't have permission to do that, cunt");
        if (!args[0]) return message.reply("You need to mention a cunt that needs a timeout. Read the instructions. Fuck sakes");
        let firstMention = args[0];
        if (firstMention.startsWith('<@') && firstMention.endsWith('>')) {
            firstMention = firstMention.slice(2, -1);
            if (firstMention.startsWith('!')) {
                firstMention = firstMention.slice(1);
            }
        }
        else{
            return message.reply("You need to mention a cunt that needs a timeout. No other text. Just mentions. eg. ~timeout @username-here @otheruser-here");
        }
        
        firstMention = await message.guild.members.cache.get(firstMention);

        let oldChannel = await firstMention.voice.channel;

        args.every(async mention => {
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
            }
            else{
                message.reply("You need to mention a cunt that needs a timeout. No other text. Just mentions. eg. ~timeout @username-here @otheruser-here");
                return false;
            }
            let x = await message.guild.members.cache.get(mention);
            if(x.voice.channel){
                x.voice.setChannel(pitchannel);
            }
            else{
                message.reply(`${x} is not in a voice channel.`);
                return false;
            }
        });
        

        const connection = joinVoiceChannel({
            channelId: pitchannel.id,
            guildId: pitchannel.guild.id,
            adapterCreator: pitchannel.guild.voiceAdapterCreator,
        });

        await sleep(3000)
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        //connection.destroy();



        const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Stop,
            },
        });

        const resource = createAudioResource('./audio/gese.mp3', { inlineVolume: true });
        resource.volume.setVolume(0.5);
        //player.stop();
       
        // player.pause();

        // // Unpause after 5 seconds
        // setTimeout(() => player.unpause(), 5_000);

        connection.subscribe(player);
        player.play(resource);


        player.on('error', error => {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
            //player.play(getNextResource());
        });

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing!');
        });
        player.on(AudioPlayerStatus.Idle, () => {
            console.log('The audio player is Idle');
            endTimeout();
        });
        player.on(AudioPlayerStatus.Buffering, () => {
            console.log('The audio player is buffering');
        });
        player.on(AudioPlayerStatus.AutoPaused, () => {
            console.log('The audio player is autopaused!');
        });
        player.on(AudioPlayerStatus.Paused, () => {
            console.log('The audio player is paused!');
        });

        function endTimeout(){
            args.every(async mention => {
                if (mention.startsWith('<@') && mention.endsWith('>')) {
                    mention = mention.slice(2, -1);
                    if (mention.startsWith('!')) {
                        mention = mention.slice(1);
                    }
                }
                else{
                    message.reply("You need to mention a cunt that needs a timeout. No other text. Just mentions. eg. ~timeout @username-here @otheruser-here");
                    return false;
                }
                let x = await message.guild.members.cache.get(mention);
                if(x.voice.channel){
                    x.voice.setChannel(oldChannel);
                }
                else{
                    message.reply(`${x} is not in a voice channel.`);
                    return false;
                }
            });
            voice.getVoiceConnection(pitchannel.guild.id).disconnect();
        }
    }
}
