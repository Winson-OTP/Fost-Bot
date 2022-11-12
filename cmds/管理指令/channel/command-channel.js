const {
    EmbedBuilder
} = require('discord.js');
const cmdCN = require('./commandChannel/main.js')

module.exports = {
    name: 'command-channel',
    async execute(interaction) {
        const set = interaction.options.getBoolean('set');
        await interaction.deferReply({ ephemeral: true })
        if (set) {
            cmdCN.searchByChannelID(interaction.channel.id, channel => {
                if (channel) return interaction.editReply({ content: '💤｜此頻道先前已被設置為指令頻道', ephemeral: true })
                interaction.channel.send({ embeds: [new EmbedBuilder()
                    .setColor('#2f4f4f')
                    .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTitle('<:computers:1038337496888655902> 此頻道為指令頻道')
                    .setDescription('所有在此頻道發送的訊息或指令，都將在60秒後被自動刪除！')
            		.setThumbnail(interaction.client.user.displayAvatarURL())] })
                interaction.channel.send('>>===================================<<')
                    .then(() => {
                        cmdCN.addChannel(interaction.guild.id, interaction.channel.id, () => {
                        interaction.editReply({ content: '💗｜成功將此頻道設置為指令頻道', ephemeral: true })
                    })
                })
            })
        } else {
            cmdCN.searchByChannelID(interaction.channel.id, channel => {
                if (!channel) return interaction.editReply({ content: '💤｜此頻道並未被設置為指令頻道', ephemeral: true })
                cmdCN.deleteChannel(interaction.guild.id, interaction.channel.id, () => {
                    interaction.editReply({ content: '💗｜成功將此頻道的指令頻道功能關閉', ephemeral: true })
                })
            })
        }
    }
}