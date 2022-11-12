const fs = require('fs');

module.exports = {
    name: 'help',
    'command': function(interaction) {
        const cmdflds = fs.readdirSync('./cmds');
        let cmdInfos = [];
        for (let fld of cmdflds) {
            const cmdfiles = fs.readdirSync(`./cmds/${fld}`).filter(file => file.endsWith(".js"));
            for (let file of cmdfiles) {
                const cmd = require(`../cmds/${fld}/${file}`);
                cmdInfos.push({ name: cmd.data.name, value: cmd.data.name })
            };
        }
        interaction.respond(cmdInfos);
    }
}