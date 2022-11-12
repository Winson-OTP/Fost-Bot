const { EmbedBuilder } = require('discord.js');
const { evaluate } = require('mathjs');
const cmdCN = require('../cmds/管理指令/channel/commandChannel/main.js');
const ctCN = require('../cmds/管理指令/channel/countingChannel/main.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        //指令頻道偵測
        cmdCN.searchByChannelID(message.channel.id, (channel) => {
            if (!channel) return
            message.react('<a:cooldown_60s:1039877691589021707>')
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
        //接龍頻道偵測
        ctCN.searchByChannelID(message.channel.id, (channel) => {
            if (!channel) return
            const formula = message.content.split(' ')[0];
            let eval;
            try {
                eval = parseInt(evaluate(formula))
            } catch(e) {
                return
            }
            let data = channel;
            if (eval != data.record.last.number+1) {
                let trueNum = data.record.last.number
                data.record.last.userid = '';
                data.record.last.number = 0;
                ctCN.updateChannel(message.guild.id, message.channel.id, data, () => {
                    message.react('❌')
                    message.reply(`❌｜正確的數字是 \`${trueNum}\` ，接龍將從 \`1\` 重新開始`);
                })
            } else if (message.author.id === data.record.last.userid) {
                data.record.last.userid = '';
                data.record.last.number = 0;
                ctCN.updateChannel(message.guild.id, message.channel.id, data, () => {
                    message.react('❌')
                    message.reply('❌｜每位使用者不得連續接兩個以上的數字，數字接龍重新從 `1` 開始');
                })
            } else if (eval === data.record.last.number+1) {
                data.record.last.userid = message.author.id;
                data.record.last.number = eval;
                if (eval>data.record.max) data.record.max = eval
                ctCN.updateChannel(message.guild.id, message.channel.id, data, () => {
                    message.react('✅')
                })
            }
        })
    }
};