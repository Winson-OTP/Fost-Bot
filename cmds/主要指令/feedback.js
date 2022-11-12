const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    category: '主要指令',
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('向機器人的開發者回饋機器人使用上的心得或問題')
        .setDMPermission(false),
    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor('#8fbc8f')
            .setTitle('向機器人開發者填寫回饋表單')
            .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
            .setDescription(`在三分鐘內點擊下方的按鈕，即可填寫機器人的回饋表單，向機器人的開發者進行回饋！
回饋的內容可以是機器人的錯誤、對機器人的建議，或是想對開發者說的話或使用上的心得唷
我們非常歡迎您的回饋 🥳`)
            .setThumbnail(interaction.client.user.displayAvatarURL());
        // btn
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('feedback')
                .setLabel('回饋表單')
                .setStyle(ButtonStyle.Success),
        );
        const msg = await interaction.reply({ embeds: [replyEmbed], components: [row], fetchReply: true });
        const btn = await msg.awaitMessageComponent({ time: 180_000, filter: (btn) => {
            if (btn.user.id !== interaction.user.id) {
                btn.reply({ content: '❎｜您無法填寫這個表單，如要進行回饋請使用 /feedback 指令', ephemeral: true });
                return false;
            }
            return true;
        }}).catch(() => {
            msg.edit({ components: [new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('unavailible').setLabel('閒置過久已自動關閉').setStyle(ButtonStyle.Secondary).setDisabled(true),
            )] });
        });
        if (!btn) return;
        const timestamp = Date.now()
        await Promise.all([
            btn.showModal(new ModalBuilder().setTitle('對機器人開發者提出回饋').setCustomId(`${timestamp}`).addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId('title').setLabel('回饋主題').setPlaceholder('要向開發者回饋的回饋主題，例如：機器人/help指令無法運作').setStyle(TextInputStyle.Short),
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId('content').setLabel('回饋內容').setPlaceholder('要向開發者回饋的內容，須完整敘述遇到的狀況或是要回饋的項目').setStyle(TextInputStyle.Paragraph),
                )
            )),
            btn.message.edit({
                embeds: [new EmbedBuilder()
                    .setColor('#808080')
                    .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTitle('回饋表單正在被填寫')
                    .setDescription('請在五分鐘內填寫完成表單，否則將被機器人視為無效行為。若表單未填寫成功您可以重新使用 /feedback 指令再次填寫')
            		.setThumbnail(interaction.client.user.displayAvatarURL())
                ],
                components: []
            }),
        ]);
        const modal = await btn.awaitModalSubmit({ time: 300_000, filter: (modal) => modal.customId == timestamp }).catch(() => {
            btn.message.edit({
                embeds: [new EmbedBuilder()
                    .setColor('#dc143c')
                    .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTitle('表單填寫時間已結束')
                    .setDescription('您在表單的填寫時限內未填寫完成表單，因此表單已經關閉，請重新使用 /feedback 指令！')
            		.setThumbnail(interaction.client.user.displayAvatarURL())
                ],
            })
        });
        if (!modal) return;
        const replyrow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`replyFeedback-${interaction.guild.id}-${interaction.user.id}`)
                .setLabel('私訊回覆')
                .setStyle(ButtonStyle.Success),
        );
        const sendMsg = await interaction.client.channels.cache.get('1033658201964564490').send({ embeds: [
            new EmbedBuilder().setColor('Blue').setAuthor({ name: `${interaction.user.username} 的使用者回饋`, iconURL: interaction.user.displayAvatarURL() }).addFields(
                { name: '使用者', value: `<@${interaction.user.id}>`, inline: true },
                { name: '伺服器', value: `${interaction.guild.name}`, inline: true },
                { name: '回饋標題', value: modal.fields.getTextInputValue('title') },
                { name: '回饋內容', value: modal.fields.getTextInputValue('content') }
            )
        ], components: [replyrow], fetchReply: true });

        modal.reply({
            embeds: [new EmbedBuilder()
                    .setColor('#5f9ea0')
                    .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTitle('感謝您填寫機器人的回饋表單')
                    .setDescription('您所填寫的回饋表單已經給與機器人的開發者進行檢視，如有任何回應將會與您聯絡，感謝您對於機器人的建議或回饋！')
            		.setThumbnail(interaction.client.user.displayAvatarURL())
            ],
        })
        
    }
};