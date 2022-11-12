const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: '管理指令',
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('解除封禁伺服器中的指定使用者')
    .addUserOption(option =>
		option
			.setName('user')
			.setDescription('要從伺服器中解除封禁的使用者或其ID')
			.setRequired(true))
    .addStringOption(option =>
		option
			.setName('reason')
			.setDescription('顯示在審核日誌中解除封禁使用者的原因'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || undefined;
        await interaction.guild.bans.remove(user, reason).catch(e => {
			throw e
		});
        await interaction.reply(`✅｜成功從伺服器中解除封禁 ${user}${reason?`，解除封禁原因為 ${reason}`:''}`);
    }
};