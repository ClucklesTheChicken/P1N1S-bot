module.exports = {
    name: "talk",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({Client, message, args}) => {
        function between(min, max) {  
            return Math.floor(
            Math.random() * (max - min) + min
            )
        }
        let randomkak = ["banana",
        "marshmellows",
        "Jesse is a poes",
        "GET CHADED",
        "Kyle is a cunt",
        "Quinton smells like old lady",
        "Steve has nik nak toes",
        "Jam has a small pee pee, and likes nik nak toes"];
        
        if(message.content.indexOf("poes") !== -1){
            message.reply("no u are a poes");
        }
        else if(message.content.indexOf("hello") !== -1){
            message.reply("Hello");
        }
        else{
            message.reply("idk wtf you said, so I'm gonna say "+randomkak[between(0, randomkak.length)]); 
        }
    }
}