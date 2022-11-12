const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: '開發者指令',
    data: new SlashCommandBuilder()
        .setName('dev')
        .setDescription('開發者專用指令')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('cmd')
            .setDescription('要執行的指令')
            .setRequired(true)
            .addChoices(
				{ name: 'List Server - 列出機器人所在的所有伺服器', value: 'ls' },
				{ name: 'Eval - 讓機器人執行指定程式碼', value: 'eval' },
            	{ name: 'Guild Info - 指定機器人所在伺服器的相關資訊', value: 'gi' },
				{ name: 'Tag Boom - 連續Tag指定使用者指定次數', value: 'tb' },
        ))
    	.addStringOption(option =>
            option.setName('var')
            .setDescription('要執行的指令所附帶的參數')),
    async execute(interaction) {
        if (interaction.user.id !== '871616467186098187') return interaction.reply({ content: '💥｜此指令僅限機器人開發者使用', ephemeral: true })
        let cmd = interaction.options.getString('cmd');
        require(`./dev/${cmd}.js`).execute(interaction);
    }
}