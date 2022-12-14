const { ContextMenuCommandBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../config.json');
const uri = `mongodb+srv://${config.mongoDBUsername}:${config.mongoDBPassword}@${config.mongoDBLink}.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('è¨æ¯ä½è')
        .setDMPermission(false)
    	.setType(3),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        client.connect((err) => {
            const collection = client.db("Say").collection("say");
            collection.findOne({ msgid: interaction.targetId })
            .then(msg => {
                if (!msg)
            		return interaction.editReply({ content: `ð¦ï½æªå¨è³æåº«ä¸­æ¥è©¢å°æ­¤è¨æ¯ï¼è«ç¢ºå®æ­¤è¨æ¯çºä½¿ç¨/sayæä»¤æç¼åº`, ephemeral: true });
                interaction.editReply({
                    content: `ðï½éåè¨æ¯æ¯ç± <@${msg.msguser}> è¦æ±æç¼éçå·ï¼`,
                    ephemeral: true
                });
            })
        });
    }
}