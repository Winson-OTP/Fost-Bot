const { SlashCommandBuilder } = require('discord.js');
const randomEmoji = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😅', '🥰', '😘', '😍', '😎', '😋', '😊', '😉', '🤩', '😏', '😴', '😑', '😯', '😷', '🤒', '🤮', '😜', '🥳'
];
const randomMessage = [
    '機器人被你戳了一下，並且告訴你他的延遲數據',
    '機器人覺得自己的存在感太低，於是告訴你他的延遲數據',
    '機器人不想告訴你他的延遲數據，但是你猛灌了他一拳',
    '機器人不知道該說些什麼，只好回答他的延遲數據',
    '機器人很納悶為什麼你要他的延遲數據，但還是告訴你了',
    '機器人正在阻止自己的延遲數據被發送，但是失敗了',
    '機器人不想跟你說話了，只想告訴你他的延遲數據',
    '機器人很好奇為什麼你知道這個指令可以讓他說出延遲數據',
    '機器人的延遲數據被擁有者偷偷發送出來了，嘿嘿',
    '機器人的延遲數據持續跳動，他拚盡全力找出了一個數值給你',
    '機器人喝了一碗雞湯，並告訴你他的延遲數據',
    '機器人開發者製作這個指令有99%的時間都在想隨機訊息的內容',
    '非常感謝您使用機器人的指令，以下是機器人的延遲數據',
    '資訊小知識：延遲數據是指資料封包傳輸至伺服器後再傳回所需的時間',
    '您能看到這條訊息代表機器人目前還正常運行！可喜可賀～',
    '雖然我不是資訊專家，但我的延遲數據看起來還不錯吧',
    '讓我看看！ 「啊！我不要啊！我的延遲數據！！」',
    '如果我的延遲數據沒有毒，那我就把它告訴你',
    '擁有者想不到要加什麼句子了，只好這樣子湊一句',
    '機器人創建後花了數天的時間製作ping指令'
];

module.exports = {
    category: '主要指令',
    data: new SlashCommandBuilder().setName('ping').setDescription('得到機器人的延遲數值'),
    async execute(interaction) {
        await interaction.reply(
            `${randomEmoji[Math.floor(Math.random()*randomEmoji.length)]} ${randomMessage[Math.floor(Math.random()*randomMessage.length)]}

> ${interaction.client.ws.ping<150 ? '🟢':'🔴'} DiscordAPI延遲：${interaction.client.ws.ping} 毫秒(ms)
> ${Date.now() - interaction.createdTimestamp<150 ? '🟢':'🔴'} 機器人延遲：${Date.now() - interaction.createdTimestamp} 毫秒(ms)`
        );
    }
};