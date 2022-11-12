const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'ls',
    async execute(interaction) {
        const guild = await interaction.client.guilds.fetch(interaction.options.getString('var'));
        const realMember = await guild.members.fetch().then(mbs => mbs.filter((member) => !member.user.bot));
        const botMember = await guild.members.fetch().then(mbs => mbs.filter((member) => member.user.bot));
        let userEmbed = new EmbedBuilder()
            .setAuthor({
                iconURL: guild.iconURL(),
                name: guild.name,
            })
            .setTitle(`${guild.name} 伺服器的相關資訊`)
            .setDescription(`以下是指定之伺服器的相關資訊`)
            .setColor('#deb887')
        	.setThumbnail(guild.iconURL())
            .addFields({
                name: '伺服器名稱',
                value: `\`${guild.name}\``,
                inline: true
            }, {
                name: '伺服器ID',
                value: `${guild.id}`,
                inline: true
            }, {
                name: '伺服器創建時間',
                value: `<t:${Math.round(guild.createdTimestamp/1000)}:F>`,
                inline: true
            }, {
                name: '伺服器擁有者',
                value: `<@${guild.ownerId}>`,
                inline: true
            }, {
                name: '伺服器成員數量',
                value: `總數量：${guild.memberCount}
真人：${realMember.size}
機器人：${botMember.size}`,
                inline: true
            }, {
                name: '伺服器頭像網址',
                value: `[點我連結伺服器頭像](${guild.iconURL()})`,
                inline: true
            })
        await interaction.reply({ embeds: [userEmbed] , ephemeral: true })
    }
}