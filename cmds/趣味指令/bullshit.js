const { SlashCommandBuilder } = require('discord.js');
const buffer = require('buffer');
const data = require('./bullshit/data.json');

module.exports = {
    category: '趣味指令',
    data: new SlashCommandBuilder()
        .setName('bullshit')
        .setDescription('讓機器人產生一段唬爛文字')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('topic')
            .setDescription('讓機器人產生文字的主題')
            .setRequired(true)
            .setMaxLength(50))
        .addIntegerOption(option =>
            option.setName('count')
            .setDescription('讓機器人產生文字的字數')
            .setMinValue(10).setMaxValue(10000)),
    async execute(interaction) {
        let topic = interaction.options.getString('topic');
        let count = interaction.options.getInteger('count') || 400;
        let result = '';
        while (result.length < count) {
            result = result + 
                data.start[Math.floor(Math.random()*data.start.length)] + 
                data.names[Math.floor(Math.random()*data.names.length)] + 
                data.afterNames[Math.floor(Math.random()*data.afterNames.length)] + 
                data.end[Math.floor(Math.random()*data.end.length)]
        }
        let replys = '';
        if (('🌬｜機器人成功幫您唬爛了 `' + result.replace(/<>/g, topic).length + '` 字的文章\n```' + result.replace(/<>/g, topic) + '```').length >= 1999) {
            const file = new buffer.Blob([result.replace(/<>/g, topic)])
            replys = {
                content: '🌬｜機器人成功幫您唬爛了 `' + result.replace(/<>/g, topic).length + '` 字的文章',
                files: [{ name: 'bullshit.txt', attachment: file.stream(), description: `${topic} 的唬爛產生結果` }]
            }
        } else {
            replys =  '🌬｜機器人成功幫您唬爛了 `' + result.replace(/<>/g, topic).length + '` 字的文章\n```' + result.replace(/<>/g, topic) + '```'
        }
        await interaction.reply(replys)
    }
}