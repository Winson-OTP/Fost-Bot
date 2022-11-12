const {
    EmbedBuilder
} = require('discord.js');
const ctCN = require('./countingChannel/main.js')

module.exports = {
    name: 'counting-channel',
    async execute(interaction) {
        const set = interaction.options.getBoolean('set');
        await interaction.deferReply({ ephemeral: true })
        if (set) {
            ctCN.searchByChannelID(interaction.channel.id, channel => {
                if (channel) return interaction.editReply({ content: '💤｜此頻道先前已被設置為接龍頻道', ephemeral: true })
                interaction.channel.send({ embeds: [new EmbedBuilder()
                    .setColor('#6a5acd')
                    .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTitle('<:computers:1038337496888655902> 此頻道為接龍頻道')
                    .setDescription(`請從 \`1\` 開始進行數數，並且遵循以下規則
1. 每輪接龍由 \`1\` 開始，並順向以整數進行接龍，例如 \`4\` 的下一個是 \`5\`
2. 每位使用者不得連續接兩個數字，例如同一使用者接了 \`2\`，即不能再接 \`3\`
3. 可以使用簡單的算式或是數學函式來表達數字，但訊息中如有空格，僅會擷取空格前的內容
4. 如使用者接出了錯誤的數字，將會結束該輪遊戲，並且自動重新開始一輪新的接龍遊戲
`)
            		.setThumbnail(interaction.client.user.displayAvatarURL())] })
                    .then(() => {
                        ctCN.addChannel(interaction.guild.id, interaction.channel.id, () => {
                        interaction.editReply({ content: '💗｜成功將此頻道設置為接龍頻道', ephemeral: true })
                    })
                })
            })
        } else {
            ctCN.searchByChannelID(interaction.channel.id, channel => {
                if (!channel) return interaction.editReply({ content: '💤｜此頻道並未被設置為接龍頻道', ephemeral: true })
                ctCN.deleteChannel(interaction.guild.id, interaction.channel.id, () => {
                    interaction.editReply({ content: '💗｜成功將此頻道的接龍頻道功能關閉', ephemeral: true })
                })
            })
        }
    }
}