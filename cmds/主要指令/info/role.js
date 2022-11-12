const {
    EmbedBuilder
} = require('discord.js');
const r = {
    "AddReactions": "新增表情符號",
    "Administrator": "管理員",
    "AttachFiles": "新增檔案",
    "BanMembers": "封禁使用者",
    "ChangeNickname": "更改暱稱",
    "Connect": "連接",
    "CreateInstantInvite": "創建邀請連結",
    "CreatePrivateThreads": "創建私人討論串",
    "CreatePublicThreads": "創建公開討論串",
    "DeafenMembers": "靜音使用者",
    "EmbedLinks": "嵌入連結",
    "KickMembers": "踢出使用者",
    "ManageChannels": "管理頻道",
    "ManageEmojisAndStickers": "管理表情符號和貼圖",
    "ManageEvents": "管理活動",
    "ManageGuild": "管理伺服器",
    "ManageMessages": "管理訊息",
    "ManageNicknames": "管理使用者暱稱",
    "ManageRoles": "管理身分組",
    "ManageThreads": "管理討論串",
    "ManageWebhooks": "管理Webhook",
    "MentionEveryone": "提及所有成員",
    "ModerateMembers": "管理成員",
    "MoveMembers": "移動成員",
    "MuteMembers": "禁言成員",
    "PrioritySpeaker": "優先發言者",
    "ReadMessageHistory": "檢視訊息歷史",
    "RequestToSpeak": "請求發言",
    "SendMessages": "發送訊息",
    "SendMessagesInThreads": "在討論串發送訊息",
    "SendTTSMessages": "發送文字朗讀訊息",
    "Speak": "說話",
    "Stream": "直播",
    "UseApplicationCommands": "使用應用程式指令",
    "UseEmbeddedActivities": "使用嵌入行為",
    "UseExternalEmojis": "使用外部表情符號",
    "UseExternalStickers": "使用外部貼圖",
    "UseVAD": "使用VAD",
    "ViewAuditLog": "檢視審計日誌",
    "ViewChannel": "檢視頻道",
    "ViewGuildInsights": "檢視伺服器分析"
}

module.exports = {
    name: 'role',
    async execute(interaction) {
        const role = interaction.options.getRole('role')
        let permission = [];
        role.permissions.toArray().forEach(s => permission.push(`\`${r[s]}\``))
        let roleEmbed = new EmbedBuilder()
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag,
            })
            .setTitle(`${role.name} 身分組的相關資訊`)
            .setDescription(`以下是 ${role} 的身分組相關資訊`)
            .setColor('#c0c0c0')
            .addFields({
                name: '<:bots:1038338748729016420> 身分組名稱',
                value: `\`${role.name}\``,
                inline: true
            }, {
                name: '<:idcards:1038339094150922270> 身分組ID',
                value: `${role.id}`,
                inline: true
            }, {
                name: '<:times:1038339336451666030> 身分組創建時間',
                value: `<t:${Math.round(role.createdTimestamp/1000)}:F>`,
                inline: true
            }, {
                name: '<:links:1038340824813027368> 身分組權限',
                value: `${permission.join(', ')}`,
                inline: true
            })
        await interaction.reply({ embeds: [roleEmbed] })
    }
}