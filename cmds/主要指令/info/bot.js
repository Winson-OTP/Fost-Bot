const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'bot',
    async execute(interaction) {
        const user = interaction.client.user
        const { version } = require('../../../package.json');
        let botEmbed = new EmbedBuilder()
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: user.tag,
            })
            .setTitle(`${user.tag} 機器人的相關資訊`)
            .setDescription(`以下是機器人的相關資料和資訊`)
            .setColor('#d8bfd8')
        	.setThumbnail(user.displayAvatarURL())
            .addFields({
                name: '<:bots:1038338748729016420> 機器人名稱',
                value: `\`${user.tag}\``,
                inline: true
            }, {
                name: '<:idcards:1038339094150922270> 機器人ID',
                value: `${user.id}`,
                inline: true
            }, {
                name: '<:times:1038339336451666030> 創建時間',
                value: `<t:${Math.round(user.createdTimestamp/1000)}:F>`,
                inline: true
            }, {
                name: '<:times:1038339336451666030> 加入時間',
                value: `<t:${Math.round(interaction.guild.joinedTimestamp/1000)}:F>`,
                inline: true
            }, {
                name: '<:datas:1038339659341774878> 相關數據',
                value: `伺服器數量：${interaction.client.guilds.cache.size}
使用者人數：${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}
總頻道數量：${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)}`,
                inline: true
            }, {
                name: '<:users:1038337069308719135> 開發者',
                value: `<@871616467186098187>`,
                inline: true
            }, {
                name: '<:versions:1038340210666250250> 當前版本',
                value: version,
                inline: true
            }, {
                name: '<:times:1038339336451666030> 啟動時間',
                value: `${new Date(interaction.client.uptime).toISOString().substr(11, 8)}`,
                inline: true
            }, {
                name: '<:links:1038340824813027368> 相關連結',
                value: `[邀請機器人](https://discord.com/api/oauth2/authorize?client_id=1031906245839437925&permissions=8&scope=bot%20applications.commands)`,
                inline: true
            })
        interaction.reply({ embeds: [botEmbed] })
    }
}