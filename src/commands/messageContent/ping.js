const Discord = require("discord.js");

module.exports = {
	name: 'ping',
	description: 'ping-pong',
	aliases: [''],
	usage: '<prefix>ping',
    enabled: true,
    developerOnly: false,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */
	execute(message, args, client, db) {

        let activeButton = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setCustomId("veriguncelleme")
            .setLabel("Verileri güncelle")
            .setStyle("PRIMARY")

        )

        let inactiveButton = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
            .setCustomId("veriguncelleme")
            .setLabel("Verileri güncelle")
            .setStyle("PRIMARY")
            .setDisabled(true)

        )

        message.reply({ content: "Pong! " + client.ws.ping + "ms", components: [activeButton] }).then(async (msg) => {

            let filter = x => x.user.id === message.author.id

            let collector = msg.createMessageComponentCollector({ filter: filter, time: 30000, type: "BUTTON" })

            collector.on("collect", async (interaction) => {

                if(interaction.user.id !== message.author.id) { return msg.reply({ ephemeral: true, content: "Bu butonu sadece <@" + message.author.id + "> kullanabilir." }) }

                if(interaction.customId === "veriguncelleme") {

                    msg.edit({ content: "Pong! " + client.ws.ping + "ms\n", components: [activeButton]})

                }

                interaction.deferUpdate()

            })

            collector.on("end", async () => {

                msg.edit({ content: "Pong! " + client.ws.ping + "ms\n", components: [inactiveButton]})

            })

        })

	},
};