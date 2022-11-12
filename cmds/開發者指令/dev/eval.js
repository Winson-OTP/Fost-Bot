const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'eval',
    async execute(interaction) {
        const vars = interaction.options.getString('var')
        const result = await eval(vars);
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('#696969')
                .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
                .setTitle('程式碼的執行結果')
                .setDescription(`執行的程式碼：
\`\`\`js
${vars}
\`\`\`
執行結果：
\`\`\`js
${result}
\`\`\``)
         		.setThumbnail(interaction.client.user.displayAvatarURL())], ephemeral: true
        })
    }
}