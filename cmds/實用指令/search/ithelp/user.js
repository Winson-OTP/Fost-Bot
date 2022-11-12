const {
    EmbedBuilder
} = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    name: 'user',
    async execute(interaction) {
        await interaction.deferReply()
        const searchText = interaction.options.getString('text');
        await request({
            url: `https://ithelp.ithome.com.tw/search?search=${encodeURI(searchText)}&tab=user` ,
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
            }
        }, async function (err, res, body) {
            if (err) throw err
            let $ = cheerio.load(body)
            let searchEmbed = new EmbedBuilder()
                .setAuthor({
                    iconURL: interaction.client.user.displayAvatarURL(),
                    name: interaction.client.user.tag,
                })
                .setTitle(`${searchText} 在iT邦幫忙中的使用者查詢結果`)
                .setDescription(`以下是指定關鍵字的搜尋結果`)
                .setColor('#87ceeb')
            let titles = [], infos = [], links = [];
            $('.member-list__name').each(function(i, elem) {
                titles.push($(this).text())
                links.push($(this).attr('href'))
            })
            $('.member-list__data').each(function(i, elem) {
                infos.push($(this).text())
            })
            if (titles.length == 0) return interaction.editReply({ content: '✖｜搜尋不到與關鍵字相符的結果，請擴大搜索範圍並再試' })
            for (let i=0; i<(titles.length<4? titles.length:4); i++) {
                let info = '';
                for (let z=i*6; z<i*6+6; z++) {
                    info = `${info} ${infos[z]}`
                }
                searchEmbed.addFields({ name: `<:users:1038337069308719135> ${titles[i]}`, value: `> ${info}\n> ${links[i]}` })
            }
            await interaction.editReply({ embeds: [searchEmbed] })
        });
    }
}