const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: '管理指令',
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('刪除當前頻道指定數量的訊息')
    .addIntegerOption(option =>
		option
			.setName('number')
			.setDescription('要從當前頻道刪除訊息的數量')
			.setRequired(true).setMaxValue(100).setMinValue(1))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
    async execute(interaction) {
        const number = interaction.options.getInteger('number');
        await interaction.channel.messages.fetch({ limit: number }).then(messages => {
            interaction.channel.bulkDelete(messages, true).catch(e => { throw e });
        })
        await interaction.reply({ content: `✅｜成功從伺服器中刪除 \`${number}\` 則訊息（若實際刪除數量與設置數量不符，可能是因為機器人無法刪除超過兩周前的訊息）` , ephemeral: true });
    }
};