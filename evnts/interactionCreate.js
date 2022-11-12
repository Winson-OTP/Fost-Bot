const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const cmd = interaction.client.commands.get(interaction.commandName);
            if (!cmd) return;
            try {
                 await (await interaction.client.channels.fetch('1034060285805342761')).send(` \`\`\`js
[${interaction.guild.name}] | [${interaction.user.tag}] | 使用了指令 ${interaction.commandName}
\`\`\``);
                await interaction.client.user.setPresence({ activities: [{ name: `/${interaction.commandName || 'Fost Bot'}`}], status: 'online' });
                await cmd.execute(interaction);
            } catch (err) {
                if (interaction.deferred) {
                    interaction.editReply({
                        content: `💥｜執行指令的過程中發生錯誤 \`${err.name}\` ，已經自動回報予開發人員，將盡快處理`,
                        ephemeral: true
                    });
                } else {
                    interaction.reply({
                        content: `💥｜執行指令的過程中發生錯誤 \`${err.name}\` ，已經自動回報予開發人員，將盡快處理`,
                        ephemeral: true
                    });
                }
                throw err
            };
        }
        if (interaction.isAutocomplete()) {
            const { commandName } = interaction;
 		   const { name } = interaction.options.getFocused(true);
            interaction.client.autocomplete.get(commandName)[name](interaction);
        }
        if (interaction.isButton()) {
            const { customId } = interaction
            const cmd = interaction.client.buttons.get(customId.split('-')[0]) || undefined;
            if (!cmd) return
            cmd.execute(interaction, customId.split('-'))
        }
    }
};