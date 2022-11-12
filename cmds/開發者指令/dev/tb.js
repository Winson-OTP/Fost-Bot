const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'tb',
    async execute(interaction) {
        let msg = interaction.options.getString('var');
        msg = msg.split(', ');
        await interaction.reply({ content: '💔｜即將開始執行', ephemeral: true })
        for (let i=0; i<parseInt(msg[0]); i++) {
            interaction.channel.send(msg[1])
        }
    }
}