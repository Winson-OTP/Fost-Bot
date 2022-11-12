const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('../../../../config.json');
const uri = `mongodb+srv://${config.mongoDBUsername}:${config.mongoDBPassword}@${config.mongoDBLink}.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function addChannel(guildID, channelID, cb) {
    client.connect(err => {
        const collection = client.db("Channel").collection("counting-channel");
        collection.insertOne({
            guildid: guildID, 
            channelid: channelID, 
            record: {
                last: {
                    userid: '',
                    number: 0
                },
                max: 0
            } 
        });
        cb()
    });
}

function updateChannel(guildID, channelID, newDocument, cb) {
    client.connect(err => {
        const collection = client.db("Channel").collection("counting-channel");
        collection.replaceOne({ guildid: guildID, channelid: channelID }, newDocument);
        cb()
    });
}

function deleteChannel(guildID, channelID, cb) {
    client.connect(err => {
        const collection = client.db("Channel").collection("counting-channel");
        collection.deleteOne({ guildid: guildID, channelid: channelID });
        cb()
    });
}

function searchByGuildID(guildID, cb) {
    client.connect(err => {
        const collection = client.db("Channel").collection("counting-channel");
        collection.findOne({ guildid: guildID })
            .then(result => cb(result))
    });
}

function searchByChannelID(channelID, cb) {
    client.connect(err => {
        const collection = client.db("Channel").collection("counting-channel");
        collection.findOne({ channelid: channelID })
            .then(result => cb(result))
    });
}

module.exports = {
    addChannel, deleteChannel, searchByGuildID, searchByChannelID, updateChannel
}