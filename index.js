const fs = require('fs');
const chalk = require('chalk');

const config = require('./config.json');
const ID = config.botClientID;
const TOKEN = config.botToken;

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    EmbedBuilder
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent],
    partials: [Partials.Channel, Partials.User, Partials.GuildMember]
});

//事件監聽器創建
const evntfiles = fs.readdirSync(`./evnts`).filter(file => file.endsWith(".js"));
for (let file of evntfiles) {
    const evnt = require(`./evnts/${file}`);
    if (evnt.once) {
        client.once(evnt.name, (...args) => evnt.execute(...args, cmds));
    } else {
        client.on(evnt.name, (...args) => evnt.execute(...args, cmds));
    };
}

//指令部署
const cmdflds = fs.readdirSync('./cmds');
const cmds = [];
client.commands = new Collection();
for (let fld of cmdflds) {
    const cmdfiles = fs.readdirSync(`./cmds/${fld}`).filter(file => file.endsWith(".js"));
    for (let file of cmdfiles) {
        const cmd = require(`./cmds/${fld}/${file}`);
        client.commands.set(cmd.data.name, cmd);
        cmds.push(cmd.data.toJSON());
    };
}

const contextCmdfld = fs.readdirSync('./contexts').filter(file => file.endsWith(".js"));
const contextCmds = [];
for (let file of contextCmdfld) {
	const cmd = require(`./contexts/${file}`);
	client.commands.set(cmd.data.name, cmd);
	cmds.push(cmd.data.toJSON());
};

//autocomplete部署
client.autocomplete = new Collection();
const acFiles = fs.readdirSync('./autocomplete').filter(file => file.endsWith('.js'));
for (const file of acFiles) {
	const ac = require(`./autocomplete/${file}`);
    client.autocomplete.set(ac.name, ac);
}

//button部署
client.buttons = new Collection();
const btnFiles = fs.readdirSync('./btns').filter(file => file.endsWith('.js'));
for (const file of btnFiles) {
	const btn = require(`./btns/${file}`);
    client.buttons.set(btn.name, btn);
}

client.login(TOKEN);

process
    .on("unhandledRejection", onError)
    .on("uncaughtException", onError);

async function onError(error, origin) {
    await console.log(chalk.red('錯誤產生｜新的錯誤產生了，以下為錯誤訊息'))
    await console.error(error);
    await (await client.channels.fetch('1033219551661396008')).send({
        content: `<@871616467186098187>`,
        embeds: [
            new EmbedBuilder()
            .setAuthor({
                iconURL: client.user.displayAvatarURL(),
                name: client.user.tag,
            })
            .setTitle('天外飛來的' + error.name + '攻擊了機器人')
            .setDescription('```' + error + '```')
            .setColor('#4A90E2')
        ]
    });
}