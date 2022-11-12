const {
    SlashCommandBuilder, EmbedBuilder
} = require('discord.js');

module.exports = {
    category: '實用指令',
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('查詢特定網頁的指定關鍵字或類別資料')
        .setDMPermission(false)
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
            .setName('pansci')
            .setDescription('查詢泛科學網頁中的指定關鍵字資料')
            .addSubcommand(subcommand =>
                subcommand
                .setName('article')
                .setDescription('查詢泛科學網頁中的指定關鍵字文章')
                .addStringOption(option => option.setName('text').setDescription('要查詢的關鍵字').setRequired(true))))
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
            .setName('cwb')
            .setDescription('查詢中央氣象局網頁中的指定資料')
            .addSubcommand(subcommand =>
                subcommand
                .setName('eq')
                .setDescription('查詢中央氣象局網頁中的最近地震資料')
                .addIntegerOption(option => option.setName('index').setDescription('倒數第幾筆資料 (由0開始計算)').setMinValue(0).setMaxValue(15)))
            .addSubcommand(subcommand =>
                subcommand
                .setName('weather36')
                .setDescription('查詢中央氣象局網頁中的指定縣市36小時天氣預報')
                .addStringOption(option => option.setName('city').setDescription('要查詢天氣資料的城市').setRequired(true).addChoices(
            		{ name: '基隆市', value: '基隆市' },
            		{ name: '臺北市', value: '臺北市' },
            		{ name: '新北市', value: '新北市' },
            		{ name: '桃園市', value: '桃園市' },
            		{ name: '新竹市', value: '新竹市' },
            		{ name: '新竹縣', value: '新竹縣' },
            		{ name: '苗栗縣', value: '苗栗縣' },
            		{ name: '臺中市', value: '臺中市' },
            		{ name: '彰化縣', value: '彰化縣' },
            		{ name: '南投縣', value: '南投縣' },
            		{ name: '雲林縣', value: '雲林縣' },
            		{ name: '嘉義市', value: '嘉義市' },
            		{ name: '嘉義縣', value: '嘉義縣' },
            		{ name: '臺南市', value: '臺南市' },
            		{ name: '高雄市', value: '高雄市' },
            		{ name: '屏東縣', value: '屏東縣' },
            		{ name: '宜蘭縣', value: '宜蘭縣' },
            		{ name: '花蓮縣', value: '花蓮縣' },
            		{ name: '臺東縣', value: '臺東縣' },
            		{ name: '澎湖縣', value: '澎湖縣' },
            		{ name: '金門縣', value: '金門縣' },
            		{ name: '連江縣', value: '連江縣' }
        		))))
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
            .setName('ithelp')
            .setDescription('查詢iT邦幫忙網頁中的指定關鍵字內容')
            .addSubcommand(subcommand =>
                subcommand
                .setName('article')
                .setDescription('查詢iT邦幫忙網頁中的指定關鍵字文章')
                .addStringOption(option => option.setName('text').setDescription('要查詢的關鍵字').setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                .setName('question')
                .setDescription('查詢iT邦幫忙網頁中的指定關鍵字問答')
                .addStringOption(option => option.setName('text').setDescription('要查詢的關鍵字').setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                .setName('user')
                .setDescription('查詢iT邦幫忙網頁中的指定關鍵字用戶')
                .addStringOption(option => option.setName('text').setDescription('要查詢的關鍵字').setRequired(true))))
        .addSubcommandGroup(subcommandgroup =>
            subcommandgroup
            .setName('stackoverflow')
            .setDescription('查詢StackOverflow網頁中的指定關鍵字內容')
            .addSubcommand(subcommand =>
                subcommand
                .setName('question')
                .setDescription('查詢StackOverflow網頁中的指定關鍵字問答')
                .addStringOption(option => option.setName('text').setDescription('要查詢的關鍵字').setRequired(true)))),
    async execute(interaction) {
        const subcmdgrp = interaction.options.getSubcommandGroup();
        const subcmd = interaction.options.getSubcommand();
        require(`./search/${subcmdgrp}/${subcmd}`).execute(interaction);
    }
};