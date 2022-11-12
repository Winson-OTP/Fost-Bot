const {
    SlashCommandBuilder, PermissionFlagsBits
} = require('discord.js');

module.exports = {
    category: '管理指令',
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('對頻道進行相關的機器人設定')
        .setDMPermission(false)
    	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
		subcommand
			.setName('command-channel')
			.setDescription('將當前頻道設置或取消設置為指令頻道 (訊息在發送後60秒自動刪除)')
			.addBooleanOption(option => option.setName('set').setDescription('是否要設置當前頻道為指令頻道').setRequired(true)))
        .addSubcommand(subcommand =>
		subcommand
			.setName('counting-channel')
			.setDescription('將當前頻道設置或取消設置為數字接龍小遊戲頻道')
			.addBooleanOption(option => option.setName('set').setDescription('是否要設置當前頻道為數字接龍頻道').setRequired(true))),
    async execute(interaction) {
        const subcmd = interaction.options.getSubcommand();
        require(`./channel/${subcmd}.js`).execute(interaction);
    }
};