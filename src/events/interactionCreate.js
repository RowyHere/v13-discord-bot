const Discord = require('discord.js');
const config = require("../settings/config.json");
const db = require('quick.db');

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

/**@param {Discord.Client} client
 * @param {Discord.interactionCreate} interactionCreate
 */

module.exports = async (interaction,client) => {
    
    if(!interaction.isCommand()) return;

    const command = client.slashcommands.get(interaction.commandName);
    if (!command) return;

    if(command.developerOnly === true) { 

        if(config.developers.includes(interaction.user.id)) {

        return interaction.reply({ content: "Bu komutu sadece geliştiricim kullanabilir.", ephemeral: true })

        }
    
    }

    if(command.enabled === false) return interaction.reply({ content: "Bu komut şuanlık kullanım dışıdır.", ephemeral: true })
  
    try {
      await command.execute(interaction, client, db);
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: 'Komutu çalıştırırken hata ile karşılaştım geliştiricime ulaşın.',
        ephemeral: true
      });
    };

}