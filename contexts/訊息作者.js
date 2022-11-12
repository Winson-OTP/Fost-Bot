const { ContextMenuCommandBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../config.json');
const uri = `mongodb+srv://${config.mongoDBUsername}:${config.mongoDBPassword}@${config.mongoDBLink}.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('訊息作者')
        .setDMPermission(false)
    	.setType(3),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        client.connect((err) => {
            const collection = client.db("Say").collection("say");
            collection.findOne({ msgid: interaction.targetId })
            .then(msg => {
                if (!msg)
            		return interaction.editReply({ content: `💦｜未在資料庫中查詢到此訊息，請確定此訊息為使用/say指令所發出`, ephemeral: true });
                interaction.editReply({
                    content: `💌｜這則訊息是由 <@${msg.msguser}> 要求我發送的唷！`,
                    ephemeral: true
                });
            })
        });
    }
}