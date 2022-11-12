const {
    EmbedBuilder
} = require('discord.js');
const request = require('request');

module.exports = {
    name: 'question',
    async execute(interaction) {
        await interaction.deferReply()
        const searchText = interaction.options.getString('text');
        await request({
            url: `https://api.stackexchange.com/2.3/search?page=1&pagesize=5&order=desc&sort=activity&intitle=${encodeURI(searchText)}&site=stackoverflow`,
		   gzip: true,
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control': 'no-cache',
                'Connection': 'Connection',
                'Host': 'api.stackexchange.com',
                'Referer': 'https://api.stackexchange.com/docs/search',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1'
            }
        }, async function (err, res, body) {
            if (err) throw err
            let searchEmbed = new EmbedBuilder()
                .setAuthor({
                    iconURL: interaction.client.user.displayAvatarURL(),
                    name: interaction.client.user.tag,
                })
                .setTitle(`${searchText} 在StackOverflow中的問題搜尋結果`)
                .setDescription(`以下是指定關鍵字在StackOverflow中的問答搜尋結果`)
                .setColor('#daa520')
            const data = JSON.parse(body);
            let titles = [], links = [], ownerNames = [], ownerLinks = [], createTimes = [];
            data.items.forEach(d => {
                titles.push(d.title)
                links.push(d.link)
                ownerNames.push(d.owner.display_name)
                ownerLinks.push(d.owner.link)
                createTimes.push(d.creation_date)
            })
            if (titles.length == 0) return interaction.editReply({ content: '✖｜搜尋不到與關鍵字相符的結果，請擴大搜索範圍並再試' });
            for (let i=0; i<titles.length-1; i++) {
                searchEmbed.addFields({ name: titles[i], value: `使用者：[${ownerNames[i]}](${ownerLinks[i]}) 貼文時間：<t:${createTimes[i]}:F> \n前往文章：${links[i]}` })
            }
            await interaction.editReply({ embeds: [searchEmbed] })
        });
    }
}