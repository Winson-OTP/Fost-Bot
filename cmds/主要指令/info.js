const {
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    category: '主要指令',
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('查詢使用者/機器人/伺服器/身分組的資訊')
        .setDMPermission(false)
        .addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('查詢使用者的相關資訊')
			.addUserOption(option => option.setName('user').setDescription('要查詢相關資訊的使用者')))
    	.addSubcommand(subcommand =>
		subcommand
			.setName('guild')
			.setDescription('查詢伺服器的相關資訊'))
    	.addSubcommand(subcommand =>
		subcommand
			.setName('bot')
			.setDescription('查詢機器人的相關資訊'))
    	.addSubcommand(subcommand =>
		subcommand
			.setName('role')
			.setDescription('查詢身分組的相關資訊')
             .addRoleOption(option => option.setName('role').setDescription('要查詢相關資訊的身分組').setRequired(true))),
    async execute(interaction) {
        const subcmd = interaction.options.getSubcommand();
        require(`./info/${subcmd}.js`).execute(interaction);
    }
};