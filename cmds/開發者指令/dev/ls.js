const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'ls',
    async execute(interaction) {
        const servers = interaction.client.guilds.cache.map(g => `\`${g.name}\` \`伺服器ID ${g.id}\`  \`人數 ${g.memberCount}\``)
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('#696969')
                .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
                .setTitle('機器人的所在伺服器列表')
                .setDescription(servers.join('\n'))
         		.setThumbnail(interaction.client.user.displayAvatarURL())], ephemeral: true
        })
    }
}