const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
let Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping Komutu'),
    enabled: true,
    developerOnly: false,
  
    async execute(interaction, client, db) { 

      interaction.reply({ content: "Pong! " + client.ws.ping + "ms" })

    },
};