const {
    SlashCommandBuilder, EmbedBuilder
} = require('discord.js');
const { evaluate } = require('mathjs');

module.exports = {
    category: '實用指令',
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('計算指定算式 (支援四則運算/數學相關函式)')
        .setDMPermission(false)
    	.addStringOption(option => option.setName('formula').setDescription('要計算的算式或內容').setRequired(true)),
    async execute(interaction) {
        const formula = interaction.options.getString('formula');
        const result = evaluate(formula)
        await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor('#483d8b')
            .setTitle('指定算式的計算結果')
            .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
            .setDescription(`
指定算式：
\`\`\`js
${formula}
\`\`\`
計算結果：
\`\`\`js
${result}
\`\`\`
`)]
    	})
	}
}