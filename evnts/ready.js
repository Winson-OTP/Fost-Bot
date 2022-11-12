const chalk = require("chalk");
const config = require('../config.json')
const ID = config.botClientID;
const TOKEN = config.botToken;

const { Routes, REST } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(TOKEN);

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, cmds) {
        try {
            await rest.put(Routes.applicationCommands(ID), { body: cmds });
        } catch (err) {
            if (err) console.error(err);
            process.exit(1);
        };
        await client.user.setPresence({ activities: [{ name: 'Fost Bot' }], status: 'online' });
        await (await client.channels.fetch('1039162963807981668')).send(` \`\`\`js
機器人 ${client.user.tag} 成功上線
\`\`\``);
        console.log(chalk.green(`機器人 ${client.user.tag} 成功上線`));
    }
};