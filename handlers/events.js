const bot = require("../app");
const { getFiles } = require("../util/functions");

module.exports = (bot, reload) =>{
    const {Client} = bot;

    let events = getFiles("./events", ".js");

    if(events.length === 0){
       console.log("No events"); 
    }

    events.forEach((f, i) => {
        if(reload){
            delete require.cache[require.resolve(`../events/${f}`)];
        }
        const event = require(`../events/${f}`);
        Client.events.set(event.name, event);
        if(!reload){
            console.log(`${i + 1}. ${f} loaded`);
        }
    });
    if(!reload){
        initEvents(bot);
    }
}

function triggerEventHandler(bot,event, ...args){
    const {Client} = bot;
    try{
        if(Client.events.has(event)){
            Client.events.get(event).run(bot, ...args);
        }
        else{
            throw new Error(`Event ${event} does not exist`);
        }
    }
    catch(err){
        console.error(err);
    }
}

function initEvents(bot){
    const {Client} = bot;

    Client.on("ready", () =>{
        triggerEventHandler(bot, "ready");
    });

    Client.on("messageCreate", (message) =>{
        triggerEventHandler(bot, "messageCreate", message);
    });

    Client.on("guildMemberAdd", (member) =>{
        triggerEventHandler(bot, "guildMemberAdd", member);
    });
}