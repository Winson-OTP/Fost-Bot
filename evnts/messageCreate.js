const { EmbedBuilder } = require('discord.js');
const cmdCN = require('../cmds/管理指令/channel/commandChannel/main.js')

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        cmdCN.searchByChannelID(message.channel.id, (channel) => {
            if (!channel) return
            message.react('<a:cooldown_60s:1039877691589021707>')
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
};