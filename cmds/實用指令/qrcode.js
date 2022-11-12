const {
    SlashCommandBuilder
} = require('discord.js');
const QRCode = require('qrcode');
const buffer = require('buffer');

module.exports = {
    category: '實用指令',
    data: new SlashCommandBuilder()
        .setName('qrcode')
        .setDescription('產生連結指定內容或網址的QRCode')
        .setDMPermission(false)
    	.addStringOption(option => option.setName('content').setDescription('要連結的內容或網址').setRequired(true)),
    async execute(interaction) {
        const content = interaction.options.getString('content');
        QRCode.toDataURL(content).then(url =>{
            let doc = dataURItoBlob(url)
            interaction.reply({ 
                content: `💨｜成功產生 \`${content}\` 的QRCode`,
                files: [{ name: 'qrcode.png', attachment: doc.stream(), description: `${content} 的QRCode產生結果` }]
            })
        })
    }
};

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  var data = dataURI.split(',')[1]; 
  var byteString = Buffer.from(data, "base64");

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([byteString], { type: mimeString  });
  return blob;
}