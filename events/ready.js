const bot = require("../index")

module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log("Logged in as " + bot.Client.user.tag + ". Ready to do P1N1S things");
    }
}