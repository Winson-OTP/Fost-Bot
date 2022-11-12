const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'user',
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user
        let userEmbed = new EmbedBuilder()
            .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: user.tag,
            })
            .setTitle(`${user.tag} 使用者的相關資訊`)
            .setDescription(`以下是${user.tag == interaction.user.tag? '您':'您所指定之用戶'}的使用者相關資訊`)
            .setColor('#87cefa')
        	.setThumbnail(user.displayAvatarURL())
            .addFields({
                name: '<:users:1038337069308719135> 使用者名稱',
                value: `\`${user.tag}\``,
                inline: true
            }, {
                name: '<:idcards:1038339094150922270> 使用者ID',
                value: `${user.id}`,
                inline: true
            }, {
                name: '<:bots:1038338748729016420> 是否為機器人',
                value: `${user.bot ? '是':'否'}`,
                inline: true
            }, {
                name: '<:times:1038339336451666030> 使用者創建時間',
                value: `<t:${Math.round(user.createdTimestamp/1000)}:F>`,
                inline: true
            }, {
                name: '<:links:1038340824813027368> 使用者頭像網址',
                value: `[點我連結使用者頭像](${user.displayAvatarURL()})`,
                inline: true
            })
        interaction.reply({ embeds: [userEmbed] })
    }
}