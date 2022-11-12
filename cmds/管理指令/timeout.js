const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: '管理指令',
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('禁言伺服器中的指定使用者')
    .addUserOption(option =>
		option
			.setName('member')
			.setDescription('要從伺服器中禁言的使用者')
			.setRequired(true))
    .addIntegerOption(option =>
		option
			.setName('times')
			.setDescription('禁言使用者的時長 (以分鐘為單位)')
            .setRequired(true))
    .addStringOption(option =>
		option
			.setName('reason')
			.setDescription('顯示在審核日誌中禁言使用者的原因'))
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .setDMPermission(false),
    async execute(interaction) {
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason') || undefined;
        const times = interaction.options.getInteger('times');
        const roleOfMember = member.roles.highest;
        const roleOfBot = interaction.guild.roles.botRoleFor(interaction.client.user);
        if (interaction.guild.roles.comparePositions(roleOfMember, roleOfBot) >= 0) return interaction.reply({ content: `⛔｜我無法從伺服器中禁言這個使用者，因為我的身分組 \`${roleOfBot.name}\` 低於或等於指定使用者的最高身分組 \`${roleOfMember.name}\` `, ephemeral: true });
        await member.timeout(times * 60 * 1000, reason).catch(e => {
			throw e
		});
        await interaction.reply(`✅｜成功從伺服器中禁言 ${member.user}${reason?`，原因為 ${reason}`:''}，將在 ${times} 分鐘後解除`);
    }
};