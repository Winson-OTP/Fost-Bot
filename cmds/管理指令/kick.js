const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: '管理指令',
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('踢出伺服器中的指定使用者')
    .addUserOption(option =>
		option
			.setName('member')
			.setDescription('要從伺服器中踢出的使用者')
			.setRequired(true))
    .addStringOption(option =>
		option
			.setName('reason')
			.setDescription('顯示在審核日誌中踢出使用者的原因'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
    async execute(interaction) {
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason') || undefined;
        const roleOfMember = member.roles.highest;
        const roleOfBot = interaction.guild.roles.botRoleFor(interaction.client.user);
        if (interaction.guild.roles.comparePositions(roleOfMember, roleOfBot) >= 0) return interaction.reply({ content: `⛔｜我無法從伺服器中踢出這個使用者，因為我的身分組 \`${roleOfBot.name}\` 低於或等於指定使用者的最高身分組 \`${roleOfMember.name}\` `, ephemeral: true });
        await member.kick(reason).catch(e => {
			throw e
		});
        await interaction.reply(`✅｜成功從伺服器中踢出 ${member.user}${reason?`，原因為 ${reason}`:''}`);
    }
};