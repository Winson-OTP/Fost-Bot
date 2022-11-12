const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'replyFeedback',
    async execute(interaction, args) {
        const timestamp = Date.now()
        await Promise.all([
            interaction.showModal(new ModalBuilder().setTitle('回應使用者的回饋內容').setCustomId(`${timestamp}`).addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId('content').setLabel('回應內容').setPlaceholder('要回應給提出回饋者的訊息').setStyle(TextInputStyle.Paragraph),
                )
            ))
        ]);
        const modal = await interaction.awaitModalSubmit({ time: 300_000, filter: (modal) => modal.customId == `${timestamp}` }).catch(() => {})
        if (!modal) return;
        await interaction.client.guilds.fetch(args[1]).then(guild => guild.members.fetch(args[2]).then(member => member.user.createDM()
                                                                                                 .then(dmchannel => dmchannel.send(modal.fields.getTextInputValue('content')))))
        await modal.reply({
        	content: `訊息已發送`,
            ephemeral: true
        })
    }
};