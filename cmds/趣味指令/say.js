const { SlashCommandBuilder } = require('discord.js');
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../../config.json');
const uri = `mongodb+srv://${config.mongoDBUsername}:${config.mongoDBPassword}@${config.mongoDBLink}.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const block = ['@everyone', '@here', '<@'];

module.exports = {
    category: '趣味指令',
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('讓機器人說出指定文句')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('content')
            .setDescription('讓機器人說出的內容')
            .setRequired(true)
            .setMaxLength(2000))
        .addStringOption(option =>
            option.setName('msg-id')
            .setDescription('讓機器人回覆的訊息ID')),
    async execute(interaction) {
        let msg = interaction.options.getString('content');
        let reply = interaction.options.getString('msg-id') || false;
        block.forEach(a => {
            if (msg.includes(a)) msg = '<@BLOCK!!>'
        })
        if (msg == '<@BLOCK!!>') return interaction.reply({
            content: `您的訊息包含敏感內容而無法發送，您無法通過機器人發送包含有以下字彙的訊息 ${block.join(', ')}`,
            ephemeral: true
        });
        let msgs;
        if (reply==false) {
            client.connect(err => {
                const collection = client.db("Say").collection("say");
                interaction.channel.send({ content: `${msg}`, fetchReply: true })
                    .then((message) => collection.insertOne({ msgid: message.id, msguser: interaction.user.id }))
        	});
        } else {
            client.connect(err => {
                const collection = client.db("Say").collection("say");
                interaction.channel.messages.fetch(reply).then(rmsg => rmsg.reply({ content: `${msg}`, fetchReply: true }))
                    .then((message) => collection.insertOne({ msgid: message.id, msguser: interaction.user.id }))
        	});
        }
        await interaction.reply({
            content: '您的訊息已成功發送',
            ephemeral: true
        });
    }
}