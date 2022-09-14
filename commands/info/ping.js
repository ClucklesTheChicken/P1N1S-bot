module.exports = {
    name: "ping",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({Client, message, args}) => {
        message.reply("Pong");
    }
}