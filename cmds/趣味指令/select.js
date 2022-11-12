const { SlashCommandBuilder } = require('discord.js');
const oMsg = [
    '是', '否'
];

module.exports = {
    category: '趣味指令',
    data: new SlashCommandBuilder()
        .setName('select')
        .setDescription('詢問機器人一個問題並讓他回答')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('question')
            .setDescription('要詢問的問題')
            .setRequired(true)
            .setMaxLength(2000))
        .addStringOption(option =>
            option.setName('option')
            .setDescription('要讓機器人選擇的答案 (使用半形逗號分隔)')
            .setMaxLength(2000)),
    async execute(interaction) {
        let question = interaction.options.getString('question');
        let option = interaction.options.getString('option') || oMsg;
        if (typeof option !== 'object') option = option.split(',');
        await interaction.reply(option[Math.floor(Math.random()*option.length)]);
    }
}