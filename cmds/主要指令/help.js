const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const fs = require('fs');

module.exports = {
    category: '主要指令',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('得到機器人的指令列表')
        .addStringOption(option =>
            option.setName('command')
            .setDescription('要顯示的指令說明之指令名稱')
            .setAutocomplete(true)),
    async execute(interaction) {
        const command = interaction.options.getString('command') || undefined;
        const cmdflds = fs.readdirSync('./cmds');
        await interaction.deferReply()
        if (command) {
            let category = interaction.client.commands.get(command).category
            const cmd = interaction.client.commands.get(command);
            if (cmd == undefined) return interaction.editReply({
                content: '📕｜沒有搜尋到您所查詢的指令，請確認本機器人包含該指令，如指令中含有空格請僅輸入空格前的指令名稱',
                ephemeral: true
            });
            let cmdEmbed = new EmbedBuilder()
                .setAuthor({
                    iconURL: interaction.client.user.displayAvatarURL(),
                    name: interaction.client.user.tag,
                })
                .setDescription(`以下是 ${cmd.data.name} 指令的使用方法說明和介紹`)
                .setTitle(`${interaction.client.user.tag} 的 ${cmd.data.name} 指令`)
                .setColor('#90ee90')
                .addFields({
                    name: '指令名稱',
                    value: `\`/${cmd.data.name}\``,
                    inline: true
                }, {
                    name: '指令分類',
                    value: category,
                    inline: true
                }, {
                    name: '指令說明',
                    value: cmd.data.description,
                    inline: true
                })
            let settings = [];
            let subcmd = [];
            if (cmd.data.options.length > 0) {
                for (option of cmd.data.options) {
                    if (option.type != undefined) {
                        settings.push(`\`${option.name}\` ${option.description} ${option.required ? '(必填)' : ''}`)
                    } else {
                        subcmd.push(`\`${option.name}\` ${option.description}`)
                    }
                }
                if (settings.length > 0) cmdEmbed.addFields({ name: '指令參數', value: settings.join('\n') })
                if (subcmd.length > 0) cmdEmbed.addFields({ name: '子指令', value: subcmd.join('\n') })
            }
            interaction.editReply({
                embeds: [cmdEmbed]
            })
        } else {
            let cmdFlds = [];
            let cmdInfos = [];
            let fldNumber = 0;
            for (let fld of cmdflds) {
                const cmdfiles = fs.readdirSync(`./cmds/${fld}`).filter(file => file.endsWith(".js"));
                cmdFlds.push(fld);
                cmdInfos.push([]);
                for (let file of cmdfiles) {
                    const cmd = require(`../../cmds/${fld}/${file}`);
                    cmdInfos[fldNumber].push(`\`/${cmd.data.name}\` ${cmd.data.description}`)
                };
                fldNumber += 1
            }
            let cmdsFields = [];
            for (let i = 0; i < cmdFlds.length; i++) {
                cmdsFields.push({
                    name: `<:computers:1038337496888655902> ${cmdFlds[i]}`,
                    value: `${cmdInfos[i].join('\n')}`
                })
            }
            await interaction.editReply({
                embeds: [new EmbedBuilder()
                .setAuthor({
                    iconURL: interaction.client.user.displayAvatarURL(),
                    name: interaction.client.user.tag,
                })
                .setDescription('機器人的指令列表如下，輸入 / 即可使用')
                .setTitle(`${interaction.client.user.tag} 的指令列表`)
                .setColor('#90ee90')
                .addFields(cmdsFields)]
            });
        }

    }
};