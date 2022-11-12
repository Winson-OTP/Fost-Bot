const {
    EmbedBuilder
} = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    name: 'article',
    async execute(interaction) {
        await interaction.deferReply()
        const searchText = interaction.options.getString('text');
        await request({
            url: `https://ithelp.ithome.com.tw/search?search=${encodeURI(searchText)}&tab=article` ,
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
                .setTitle(`${searchText} 在iT邦幫忙中的文章查詢結果`)
                .setDescription(`以下是指定關鍵字的搜尋結果`)
                .setColor('#87ceeb')
            let titles = [], descriptions = [], links = [];
            $('.search-qa-list__title-link').each(function(i, elem) {
                titles.push($(this).text())
                links.push($(this).attr('href'))
            })
            $('.qa-list__summary').each(function(i, elem) {
                descriptions.push($(this).text())
            })
            if (titles.length == 0) return interaction.editReply({ content: '✖｜搜尋不到與關鍵字相符的結果，請擴大搜索範圍並再試' })
            for (let i=0; i<(titles.length<4? titles.length:4); i++) {
                searchEmbed.addFields({ name: `<:articles:1038336921253978162> ${titles[i]}`, value: `> ${descriptions[i].replace(/\n/g, '')} [閱讀更多](${links[i]})` })
            }
            await interaction.editReply({ embeds: [searchEmbed] })
        });
    }
}