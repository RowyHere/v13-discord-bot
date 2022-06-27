const chalk = require("chalk");
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 98303 });
const fs = require("fs");
const moment = require("moment");
const config = require("../src/settings/config.json");

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(config.token);

client.commands = new Discord.Collection();
client.slashcommands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

require("../src/functions/eventHandler")(client)

/*              COMMAND FILES              */

const commander = fs.readdirSync("./src/commands/messageContent").filter(files => files.endsWith('.js'));
console.log("[" + chalk.magenta("+") + "] MessageContent Loading...")
for (const files of commander) {
    const command = require(`../src/commands/messageContent/${files}`);
    client.commands.set(command.name, command);
    console.log("[" + chalk.green("+") + "] Command loaded " + chalk.green(command.name) + ` (${command.enabled ? chalk.green("Command Enabled") : chalk.red("Command Disabled")})`)
}

const slashcommander = fs.readdirSync('./src/commands/interactionContent').filter(file => file.endsWith('.js'));
console.log("[" + chalk.magenta("+") + "] InteractionContent Loading...")
for (const files of slashcommander) {
    const command = require(`../src/commands/interactionContent/${files}`);
    client.slashcommands.set(command.data.name, command);
    console.log("[" + chalk.green("+") + "] Slash Command loaded " + chalk.green(command.data.name) + ` (${command.enabled ? chalk.green("Command Enabled") : chalk.red("Command Disabled")})`)
};


/*              COMMAND FILES              */

/*                BOT CLIENT               */

client.login(config.token)

client.on("ready", async () => {

    client.user.setActivity(config.activities)
    console.log("[" + chalk.magenta("+") + "] " + chalk.cyan(client.user.username) + " is again online.")

    const commands = [];
    const commandFiles = fs.readdirSync('./src/commands/interactionContent').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../src/commands/interactionContent/${file}`);
        commands.push(command.data.toJSON());
    }
    
    client.application.commands?.set(commands)
    
})

client.on("guildCreate", async (guild) => {

    const commands = [];
    const commandFiles = fs.readdirSync('./src/commands/interactionContent').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../src/commands/interactionContent/${file}`);
        commands.push(command.data.toJSON());
    }

    (async () => {
        try {
            
               client.application.commands?.set(commands)

            console.log("[" + chalk.magenta("+") + "] Successfully loaded " + chalk.green("commands") + " on the " + chalk.cyan(guild.name) + " server.");
            client.users.cache.get(guild.ownerId).send("Thank you for adding me to your server\n**Support Server**: https://discord.gg/dMTw8s8xqg")
        } catch (error) {
            client.users.cache.get(guild.ownerId).send("Thank you for adding me to your server but there is a problem!\nadd me with application commands permissions!\n**Support Server**: https://discord.gg/dMTw8s8xqg")
            console.error(error);
            return
        }
    })();

})

/*                BOT CLIENT               */

/*              FUNCTION HERE              */
