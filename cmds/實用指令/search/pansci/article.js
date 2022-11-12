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
        request({
            url: `https://pansci.asia/?post_type%5B%5D=post&post_type%5B%5D=post_review&post_type%5B%5D=pan_booklist&s=${encodeURI(searchText)}` ,
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
                .setTitle(`${searchText} 在泛科學PanSci中的查詢結果`)
                .setDescription(`以下是指定關鍵字的搜尋結果`)
                .setColor('#87ceeb')
                .setThumbnail('https://pansci.asia/wp-content/themes/pansci-bootstrap-child/src/imgs/logo/circle/pansci_circle.png')
            let titles = [], descriptions = [], links = [];
            $('.post-title').each(function(i, elem) {
                titles.push($(this).text())
                links.push($(this).attr('href'))
            })
            $('.archive-post-eptext').each(function(i, elem) {
                descriptions.push($(this).text().replace(/\n/g, ''))
            })
            if (titles.length == 0) return interaction.editReply({ content: '✖｜搜尋不到與關鍵字相符的結果，請擴大搜索範圍並再試' })
            for (let i=0; i<(titles.length<4? titles.length:4); i++) {
                searchEmbed.addFields({ name: `<:articles:1038336921253978162> ${titles[i]}`, value: `> ${descriptions[i].slice(0, descriptions[i].length > 120? 120:descriptions[i].length)}...... [閱讀更多](${links[i]})` })
            }
            await interaction.editReply({ embeds: [searchEmbed] })
        });
    }
}