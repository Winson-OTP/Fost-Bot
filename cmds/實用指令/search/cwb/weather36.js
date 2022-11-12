const {
    EmbedBuilder
} = require('discord.js');
const request = require('request');

module.exports = {
    name: 'weather36',
    async execute(interaction) {
        await interaction.deferReply()
        const city = interaction.options.getString('city')
        request({
            url: `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-F9A2BA51-83F4-41B7-8732-1BB6C80A424B&format=JSON&locationName=${encodeURI(city)}` ,
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
            }
        }, async function (err, res, body) {
            if (err) throw err
            let searchEmbed = new EmbedBuilder()
                .setAuthor({
                    iconURL: interaction.client.user.displayAvatarURL(),
                    name: interaction.client.user.tag,
                })
                .setTitle(`中央氣象局網頁中的${city}近36小時天氣預測資料`)
                .setDescription(`此為中央氣象局的${city}近36小時天氣預測資料，此資料僅供參考，詳細資料請參閱中央氣象局官網`)
                .setColor('#87ceeb')
            const data = JSON.parse(body)
            const wtdata = data.records.location[0].weatherElement
            let wts = [];
            for (let i=0; i<3; i++) {
                wts.push('')
                wts[i] = '<:weathers:1038742530663141406> ' + wtdata[0].time[i].parameter.parameterName + '\n' //天氣現象
                wts[i] = wts[i] + '<:rains:1038743101566619678> 降雨機率 ' + wtdata[1].time[i].parameter.parameterName + '%\n' //降雨機率
                wts[i] = wts[i] + '<:temperatures:1038742691342717008> 最低溫度 ' + wtdata[2].time[i].parameter.parameterName + '℃\n' //最低溫度
                wts[i] = wts[i] + '<:temperatures:1038742691342717008> 最高溫度 ' + wtdata[4].time[i].parameter.parameterName + '℃\n' //最高溫度
                wts[i] = wts[i] + '<:softs:1038743604744687616> 舒適度 ' + wtdata[3].time[i].parameter.parameterName + '\n' //舒適度
            }
            searchEmbed.addFields(
                { name: '地區名稱', value: `${data.records.location[0].locationName}` },
                { name: `${wtdata[0].time[0].startTime}`, value: `${wts[0]}`, inline: true },
                { name: `${wtdata[0].time[1].startTime}`, value: `${wts[1]}`, inline: true },
                { name: `${wtdata[0].time[2].startTime}`, value: `${wts[2]}`, inline: true },
            )
            await interaction.editReply({ embeds: [searchEmbed] })
        });
    }
}