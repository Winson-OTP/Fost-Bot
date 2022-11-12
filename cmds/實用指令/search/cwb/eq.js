const {
    EmbedBuilder
} = require('discord.js');
const request = require('request');

module.exports = {
    name: 'eq',
    async execute(interaction) {
        await interaction.deferReply()
        const index = interaction.options.getInteger('index') || 0;
        request({
            url: `https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=CWB-F9A2BA51-83F4-41B7-8732-1BB6C80A424B&limit=1&offset=${index}&format=JSON` ,
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
                .setTitle(`中央氣象局網頁中的${index ==0? '近一筆':'倒數指定筆數'}有感地震資料`)
                .setDescription(`此為中央氣象局的${index ==0? '近一筆':'倒數指定筆數'}顯著有感地震相關資料，僅供參考，實際資料請參閱中央氣象局官網`)
                .setColor('#87ceeb')
            const data = JSON.parse(body)
            const eqdata = data.records.earthquake[0]
            const citys = eqdata.intensity.shakingArea.reduce((last, curr) => `${last}${curr.areaName} ${curr.areaIntensity.value}${curr.areaIntensity.unit} `)
            searchEmbed.addFields(
                { name: '地震連結', value: `[點我前往](${eqdata.web})`, inline: true },
                { name: '地震編號', value: `${eqdata.earthquakeNo}`, inline: true },
                { name: '地震時間', value: `${eqdata.earthquakeInfo.originTime}`, inline: true },
                { name: '地震規模', value: `${eqdata.earthquakeInfo.magnitude.magnitudeType}${eqdata.earthquakeInfo.magnitude.magnitudeValue}`, inline: true },
                { name: '地震深度', value: `${eqdata.earthquakeInfo.depth.value}${eqdata.earthquakeInfo.depth.unit}`, inline: true },
                { name: '地震震央', value: `${eqdata.earthquakeInfo.epiCenter.location}`, inline: true },
                { name: '各地區最大震度', value: `${citys}` }
            ).setImage(eqdata.reportImageURI)
            await interaction.editReply({ embeds: [searchEmbed] })
        });
    }
}